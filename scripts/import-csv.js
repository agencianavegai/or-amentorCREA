require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Tenta usar Service Role Key, senão cai pro Anon Key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Erro: Credenciais do Supabase não encontradas no .env.local.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const filePath = process.argv[2];
const typeArg = process.argv[3] || 'insumo';

if (!filePath) {
  console.error("Uso: node scripts/import-csv.js <caminho/do/arquivo.csv> [composicao|insumo]");
  process.exit(1);
}

const type = typeArg === 'composicao' ? 'compositions' : 'inputs'; // Notando que a tabela é `inputs` (insumos) e `compositions` (composições)
console.log(`\nIniciando importação pesada para a tabela: ${type}`);
console.log(`Arquivo alvo: ${filePath}\n`);

const BATCH_SIZE = 500;
let batch = [];
let totalProcessed = 0;
let insertedCount = 0;
let baseId = null;

// Função para identificar o delimitador do CSV lendo o primeiro pedaço
function getDelimiter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8').substring(0, 1000);
  const semiCount = (content.match(/;/g) || []).length;
  const commaCount = (content.match(/,/g) || []).length;
  return semiCount > commaCount ? ';' : ',';
}

function normalizeKey(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

async function getOrCreateBase(baseName) {
  try {
    const { data, error } = await supabase
      .from('reference_bases')
      .select('id')
      .eq('name', baseName)
      .limit(1);

    if (data && data.length > 0) return data[0].id;

    // Se nao existe, criar
    const { data: newBase, error: insertError } = await supabase
      .from('reference_bases')
      .insert({ name: baseName, is_active: true, is_desonerated: false })
      .select()
      .single();

    if (insertError) throw insertError;
    return newBase.id;
  } catch (err) {
    console.error("Erro ao verificar base de referência. Certifique-se que o banco local está rodando.");
    throw err;
  }
}

async function insertBatch(rows) {
  const mappedRows = rows.map(row => {
    let code = "", description = "", unit = "", price = 0, category = "";
    
    for (const [key, value] of Object.entries(row)) {
      const normKey = normalizeKey(key);
      const valSafe = (value || "").toString().trim();

      if (normKey.includes("codigo") || normKey === "cod") code = valSafe;
      else if (normKey.includes("descri") || normKey === "nome" || normKey === "item") description = valSafe;
      else if (normKey.includes("unidade") || normKey === "un" || normKey === "und") unit = valSafe;
      else if (normKey.includes("preco") || normKey.includes("valor") || normKey.includes("custo")) {
        let valStr = valSafe.replace('R$', '').trim();
        // Lida com formato monetário BR (ex: 1.250,54 -> 1250.54)
        if (valStr.includes(',') && valStr.includes('.')) {
          valStr = valStr.replace(/\./g, '').replace(',', '.');
        } else if (valStr.includes(',')) {
          valStr = valStr.replace(',', '.');
        }
        price = parseFloat(valStr) || 0;
      }
      else if (normKey.includes("classe") || normKey.includes("grupo") || normKey.includes("origem") || normKey.includes("tipo")) {
        category = valSafe;
      }
    }

    if (!code || !description) return null;

    if (type === 'compositions') {
      return { base_id: baseId, code, description, unit, unit_cost: price, category: category || 'Geral' };
    } else {
      return { base_id: baseId, code, description, unit, unit_price: price, type: category || 'Geral' };
    }
  }).filter(r => r !== null);

  if (mappedRows.length === 0) return;

  // Insert sem RLS bypass assumindo chaves públicas fortes se no client side local
  const { error } = await supabase.from(type).insert(mappedRows);
  if (error) {
    console.error(`\n❌ Falha estrutural ao inserir um lote no Supabase: ${error.message}`);
  } else {
    insertedCount += mappedRows.length;
  }
}

async function run() {
  try {
    const baseName = filePath.toLowerCase().includes('sicro') ? 'SICRO' : 'SINAPI';
    baseId = await getOrCreateBase(baseName);
    
    console.log(`Base de Referência vinculada com sucesso: ${baseName} (ID: ${baseId})`);
    
    const delimiter = getDelimiter(filePath);
    console.log(`Delimitador identificado: '${delimiter}'. Processando stream...\n`);

    const stream = fs.createReadStream(filePath)
      .pipe(csv({ separator: delimiter, mapHeaders: ({ header }) => header.trim() }));

    for await (const row of stream) {
      batch.push(row);
      totalProcessed++;
      
      if (batch.length >= BATCH_SIZE) {
        await insertBatch(batch);
        process.stdout.write(`\rProcessados: ${totalProcessed} | Inseridos DB: ${insertedCount}...`);
        batch = [];
      }
    }

    if (batch.length > 0) {
      await insertBatch(batch);
      process.stdout.write(`\rProcessados: ${totalProcessed} | Inseridos DB: ${insertedCount}...`);
    }

    console.log(`\n\n✅ [FINALIZADO] Migração concluída. ${insertedCount} itens válidos de ${totalProcessed} entraram no Supabase!`);

  } catch (error) {
    console.error("\n❌ Erro durante o fluxo de Stream CSV:", error);
  }
}

run();
