const byuiCourse = {
  code: "WDD231",
  name: "Web Frontend Development I",
  sections: [
    { sectionNum: 1, enrolled: 88, instructor: "Brother Bingham" },
    { sectionNum: 2, enrolled: 82, instructor: "Sister Shultz" },
    { sectionNum: 3, enrolled: 95, instructor: "Sister Smith" }
  ],

  enrollStudent(sectionNum) {
    const section = this.sections.find(
      (s) => s.sectionNum === Number(sectionNum)
    );
    if (section) {
      section.enrolled++;
    }
  },

  dropStudent(sectionNum) {
    const section = this.sections.find(
      (s) => s.sectionNum === Number(sectionNum)
    );
    if (section && section.enrolled > 0) {
      section.enrolled--;
    }
  },

  changeEnrollment(sectionNum, add = true) {
    if (add) {
      this.enrollStudent(sectionNum);
    } else {
      this.dropStudent(sectionNum);
    }
  }
};

export default byuiCourse;
