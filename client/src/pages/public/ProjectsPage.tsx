import { ProgramsView } from '@/features/programs/ProgramsView'
import { useSectionVisible, SectionHidden } from '@/utils/sectionVisibility'

export default function Projects() {
  const visible = useSectionVisible('Projects')
  if (!visible) return <SectionHidden />
  return <ProgramsView projects allowJoinModal={false} />
}
