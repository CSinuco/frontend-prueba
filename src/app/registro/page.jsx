"use client"
import { useState } from "react"
import Step1 from "../Componentes/Step1"
import Step2 from "../Componentes/Step2"
import Step3 from "../Componentes/Step3"

export default function NewCompanyPage() {
  const [step, setStep] = useState(1)

  // Estados para guardar los datos
  const [marca, setMarca] = useState("")
  const [titular, setTitular] = useState("")

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      {step === 1 && (
        <Step1
          marca={marca}
          setMarca={setMarca}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <Step2
          titular={titular}
          setTitular={setTitular}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <Step3
          marca={marca}
          titular={titular}
          onBack={prevStep}
          onConfirm={() => alert("Empresa registrada")}
        />
      )}
    </div>
  )
}
