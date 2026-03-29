import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { OrcamentoWizardData } from '@/lib/schemas/orcamento';

// Estilos do Documento
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333'
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2b6cb0',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b6cb0'
  },
  headerInfo: {
    fontSize: 9,
    textAlign: 'right',
    color: '#718096'
  },
  section: {
    marginBottom: 10,
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  label: {
    fontWeight: 'bold',
    color: '#4a5568'
  },
  value: {
    color: '#1a202c'
  },
  table: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ebf8ff',
    borderBottomWidth: 1,
    borderBottomColor: '#bee3f8',
    padding: 6,
    fontWeight: 'bold',
    fontSize: 9,
    color: '#2b6cb0'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
    padding: 6,
  },
  colDesc: { width: '45%' },
  colUnit: { width: '10%', textAlign: 'center' },
  colQtd: { width: '15%', textAlign: 'right' },
  colCost: { width: '15%', textAlign: 'right' },
  colTotal: { width: '15%', textAlign: 'right' },
  
  colText: { fontSize: 8 },
  
  summaryBox: {
    marginTop: 20,
    width: '50%',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#f7fafc'
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 10
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#cbd5e0',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2b6cb0'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
  },
  signatureBox: {
    marginTop: 60,
    alignItems: 'center',
  },
  signatureLine: {
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 9,
    color: '#4a5568',
  },
});

interface OrcamentoDocProps {
  data: OrcamentoWizardData;
  subtotal: number;
  totalBDI: number;
  totalGeral: number;
  dateStr?: string;
}

export const OrcamentoDocument = ({ data, subtotal, totalBDI, totalGeral, dateStr }: OrcamentoDocProps) => {
  const adminBdi = data.bdi?.administracaoCentral || 4.0;
  const lucroBdi = data.bdi?.lucro || 7.4;
  const taxRate = 5.65;
  const globalBdi = adminBdi + lucroBdi + taxRate;
  
  const currentDateStr = dateStr || new Date().toLocaleDateString('pt-BR');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>ORÇAMENTO DE ENGENHARIA</Text>
            <Text style={{ fontSize: 9, marginTop: 4, color: '#4a5568' }}>Gerado pelo Copiloto CREA</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text>Data: {currentDateStr}</Text>
            <Text>Validade: 30 dias</Text>
          </View>
        </View>

        {/* Informações da Obra */}
        <View style={styles.section}>
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Obra:</Text>
            <Text style={styles.value}>{data.setup.nomeObra || "Não preenchido"}</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Regime:</Text>
            <Text style={styles.value}>{data.setup.isDesonerado ? "Desonerado" : "Não Desonerado"}</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Cliente/Órgão:</Text>
            <Text style={styles.value}>{data.setup.cliente || "Não preenchido"} - CPF/CNPJ: {data.setup.documentoCliente || "Não informado"}</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Base de Referência:</Text>
            <Text style={styles.value}>{(data.setup.basesReferencia || []).join(' + ').toUpperCase()} {data.setup.mesReferencia ? `- ${data.setup.mesReferencia}` : ""}</Text>
          </View>
        </View>

        {/* Tabela de Composições */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesc}>DESCRIÇÃO DO SERVIÇO</Text>
            <Text style={styles.colUnit}>UNID.</Text>
            <Text style={styles.colQtd}>QTD.</Text>
            <Text style={styles.colCost}>R$ UNIT.</Text>
            <Text style={styles.colTotal}>R$ SUBTOT.</Text>
          </View>

          {data.quantitativos.itens.map((item, i) => (
            <View key={i} style={styles.tableRow} wrap={false}>
              <Text style={[styles.colDesc, styles.colText]}>{item.descricao}</Text>
              <Text style={[styles.colUnit, styles.colText]}>{item.unidade}</Text>
              <Text style={[styles.colQtd, styles.colText]}>{item.quantidade || 0}</Text>
              <Text style={[styles.colCost, styles.colText]}>{(item.custoUnitario || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
              <Text style={[styles.colTotal, styles.colText]}>{((item.quantidade || 0) * (item.custoUnitario || 0)).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
            </View>
          ))}
        </View>

        {/* Quadro Resumo */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Custo Direto (Subtotal):</Text>
            <Text style={styles.value}>R$ {subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>BDI ({globalBdi.toFixed(2)}%):</Text>
            <Text style={styles.value}>R$ {totalBDI.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
          </View>
          <View style={styles.summaryTotalRow}>
            <Text>Venda a Preço de Custo + BDI:</Text>
            <Text>R$ {totalGeral.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
          </View>
        </View>

        {/* Rodapé e Assinatura */}
        <View style={styles.footer}>
          {!!data.resumo?.observacoes ? (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Observações:</Text>
              <Text style={{ fontSize: 8, color: '#4a5568', marginTop: 3 }}>
                {data.resumo.observacoes}
              </Text>
            </View>
          ) : null}

          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>Responsável Técnico: {data.setup.nomeProfissional}</Text>
            <Text style={styles.signatureText}>CREA: {data.setup.registroCrea}</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}
