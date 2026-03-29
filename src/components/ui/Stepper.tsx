"use client"

import { Check } from "lucide-react"

interface StepperProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export function Stepper({ currentStep, totalSteps, labels }: StepperProps) {
  return (
    <div className="w-full">
      {/* Mobile: compact indicator */}
      <div className="flex items-center justify-between sm:hidden mb-1">
        <span className="text-xs font-semibold text-crea-blue-600">
          Etapa {currentStep + 1} de {totalSteps}
        </span>
        <span className="text-xs font-medium text-crea-gray-500 truncate ml-2 max-w-[60%] text-right">
          {labels[currentStep]}
        </span>
      </div>

      {/* Progress bar (mobile) */}
      <div className="sm:hidden w-full bg-crea-gray-200 rounded-full h-1.5 mb-4">
        <div
          className="bg-crea-blue-600 h-1.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Desktop: full step indicators */}
      <div className="hidden sm:flex items-center justify-between mb-8">
        {labels.map((label, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isFuture = index > currentStep

          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold border-2 transition-all duration-200
                    ${isCompleted ? "bg-crea-blue-600 border-crea-blue-600 text-white" : ""}
                    ${isCurrent ? "bg-white border-crea-blue-600 text-crea-blue-600 ring-4 ring-crea-blue-50" : ""}
                    ${isFuture ? "bg-crea-gray-100 border-crea-gray-300 text-crea-gray-400" : ""}
                  `}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span
                  className={`
                    mt-2 text-[11px] font-medium text-center w-20 leading-tight
                    ${isCurrent ? "text-crea-blue-700" : "text-crea-gray-400"}
                    ${isCompleted ? "text-crea-blue-600" : ""}
                  `}
                >
                  {label}
                </span>
              </div>

              {/* Connector line */}
              {index < totalSteps - 1 && (
                <div className="flex-1 mx-2">
                  <div
                    className={`h-0.5 w-full transition-colors duration-300 ${
                      index < currentStep ? "bg-crea-blue-600" : "bg-crea-gray-200"
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
