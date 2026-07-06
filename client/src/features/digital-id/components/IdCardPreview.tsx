import MemberIdCard from './MemberIdCard'

interface IdData {
  fullName: string
  state: string
  validityBegin: string
  validityEnd: string
  nyscCallUpNumber: string
  issueDate: string
  photo?: string
  phone?: string
  postHeld?: string
  holderSignature?: string
}

interface IdCardPreviewProps {
  idData: IdData
}

function IdCardPreview({ idData }: IdCardPreviewProps) {
  const validity = idData.validityBegin || idData.validityEnd
    ? `${idData.validityBegin || '…'} – ${idData.validityEnd || '…'}`
    : ''
  return (
    <MemberIdCard
      name={idData.fullName}
      regNo={idData.nyscCallUpNumber}
      stateBranch={idData.state}
      postHeld={idData.postHeld || ''}
      validity={validity}
      holderSignature={idData.holderSignature}
      passportPhoto={idData.photo}
      phoneNo={idData.phone || ''}
    />
  )
}

export { IdCardPreview }
export type { IdData }
