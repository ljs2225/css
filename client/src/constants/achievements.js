// Edit the `label` strings below to rename an achievement — the `number` must keep
// matching the `achievement` value stored in the database.
export const ACHIEVEMENT_CATEGORIES = [
  {
    name: 'Economic',
    achievements: [
      { number: 1, label: '*Enter Employment' },
      { number: 2, label: '*Retain Employment' },
      { number: 3, label: 'Leave public assistance' },
    ],
  },
  {
    name: 'Educational',
    achievements: [
      { number: 4, label: 'Achieve work-based project learner goal' },
      { number: 5, label: '*Enter Occupational Skills Training Program' },
      { number: 6, label: '*Enter Postsecondary Education' },
      { number: 7, label: '*Obtain High School Diploma' },
    ],
  },
  {
    name: 'Family',
    achievements: [
      { number: 8, label: 'Help more frequently with school' },
      { number: 9, label: "Increase contact with child(ren)'s teachers" },
      { number: 10, label: "More involvement in child(ren)'s school activities" },
      { number: 11, label: 'Purchase books or magazines' },
      { number: 12, label: 'Read to child(ren)' },
      { number: 13, label: 'Visit the library (with/for child(ren))' },
    ],
  },
  {
    name: 'Societal/Community',
    achievements: [
      { number: 14, label: '*Obtain citizenship' },
      { number: 15, label: 'Achieve civics skills' },
      { number: 16, label: 'Increase involvement in community activities' },
      { number: 17, label: 'Vote or register to vote' },
    ],
  },
  {
    name: 'Other',
    achievements: [{ number: 18, label: 'Other' }],
  },
];
