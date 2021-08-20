export const study = {
  id: "NCT00000000",

  published: true,
  activated: true,

  title: "Safety and Efficacy of C21 in Subjects With COVID-19",
  description:
    "This is a randomised, double-blind, placebo-controlled phase 2 trial investigating the safety and efficacy of C21 in subjects who are hospitalised with COVID-19 infection, but not in need of mechanical invasive or non-invasive ventilation.In total, approximately 100 subjects will be enrolled and randomised to receive twice daily oral administration of either standard of care (SoC) + placebo (N=50) or SoC + C21 (N=50). Subjects will be treated for 7 days.",

  sex: "All",
  minAge: 18,
  maxAge: 70,
  acceptsHealthyVolunteers: true,
  type: "Interventional",
  createdAt: 1626228360493,
  updatedAt: 1626228360493,
  researcher: {
    id: "XNrXFO3FcKRr1kcNYaoLln7QBGM2",
    name: "David Chen",
    email: "davidchen1716@googlemail.com",
  },

  conditions: ["COVID-19"],

  locations: [
    {
      address:
        "Department of Medicine, Civil Hospital and B J Medical College, Ahmadabad, Gujarat, India, 380016",
      latitude: 23.0524508,
      longitude: 72.6028567,
    },
  ],
  questions: [
    {
      type: "Inclusion",
      prompt:
        "Written informed consent, consistent with ICH-GCP R2 and local laws, obtained before the initiation of any trial related procedure",
    },
    {
      type: "Exclusion",
      prompt: "Need for mechanical invasive or non-invasive ventilation",
    },
  ],
};
