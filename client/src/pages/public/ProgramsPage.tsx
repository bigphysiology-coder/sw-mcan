import { ProgramsView } from '@/features/programs/ProgramsView'
import { useSectionVisible, SectionHidden } from '@/utils/sectionVisibility'

export default function Programs() {
  const visible = useSectionVisible('Programs')
  if (!visible) return <SectionHidden />
  return <ProgramsView />
}
