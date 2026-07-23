import { ProgramsView } from '@/features/programs/ProgramsView'
import { useSectionVisible, SectionHidden } from '@/utils/sectionVisibility'

export default function About() {
  const visible = useSectionVisible('About')
  if (!visible) return <SectionHidden />
  return <ProgramsView about />
}
