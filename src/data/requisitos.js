import { GraduationCap, Buildings, Clock } from '@phosphor-icons/react'

export const requisitos = [
  {
    id: 'graduacao',
    Icon: GraduationCap,
    titulo: 'Graduação em andamento',
    curto: 'Graduação',
    texto:
      'Cursando alguma Instituição de Ensino Superior – Bacharel, Licenciatura ou Tecnólogo, com previsão de conclusão entre 12/2027 e 12/2028.',
  },
  {
    id: 'presencial',
    Icon: Buildings,
    titulo: 'Formato híbrido e presencial',
    curto: 'Presencial',
    texto: 'Ter disponibilidade para estagiar em formato híbrido e presencial.',
  },
  {
    id: 'disponibilidade',
    Icon: Clock,
    titulo: '30 horas semanais',
    curto: 'Disponibilidade',
    texto:
      'Ter disponibilidade para estagiar 30 horas semanais, sem compensação de horas (6h diárias).',
  },
]
