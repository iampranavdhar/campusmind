export const dummyAPI = {
  Organizations: {
    Amrita: {
      OrgName: "Amrita",
      OrgID: "124579",
      OrgType: "University",
      OrgURL: "http://www.amrita.edu/",
      users: [
        {
          id: 1,
          name: "Sai Pranavdhara Reddy",
          email: "pranav@gmail.com ",
          rollNumber: "AM.EN.U4CSE20145",
          phone: "9888888888",
          address: "Madurawada, Vizag",
          dob: "22/05/2002",
          degree: "B.Tech",
          From: "2020",
          To: "2024",
          todoList: [
            {
              Category: "Work 🔨",
              Color: "#F24E1E",
              tasks: [
                {
                  taskText: "Clean the Car 🚙",
                  taskDone: false,
                },
              ],
            },
            {
              Category: "Academics ✍🏻",
              Color: "#8CFF90",
              tasks: [
                {
                  taskText: "Complete the CSE201 Assignment",
                  taskDone: true,
                },
              ],
            },
            {
              Category: "Work Out 🔥",
              Color: "#7CBF90",
              tasks: [
                {
                  taskText: "Do 20 Push Ups",
                  taskDone: false,
                },
              ],
            },
          ],
          branch: "CSE",
          section: "B",
          CGPA: 9.1,
          SemDetails: [
            {
              Semester: "Semester 1",
              SemesterStatus: "Completed",
              FeeStatus: "Paid",
              SemesterCredits: 24,
              SemesterGPA: 9.0,
              SemesterStartDate: "01/01/2020",
              SemesterEndDate: "31/01/2021",
              RegisteredCourses: [
                {
                  CourseCode: "CSE-101",
                  CourseTitle: "Introduction to Computer Science",
                  CourseCredits: 3,
                  CourseGrade: "A",
                  CourseInstructor: "Dr. N Sudhakar",
                  courseRegistrationStatus: "Registered",
                },
                {
                  CourseCode: "CSE-102",
                  CourseTitle: "Comp Sys Fundamentals",
                  CourseCredits: 3,
                  CourseGrade: "A",
                  CourseInstructor: "Dr. Ravi Varma",
                },
              ],
            },
            {
              Semester: "Semester 2",
              SemesterStatus: "Completed",
              FeeStatus: "Paid",
              SemesterCredits: 24,
              SemesterGPA: 9.2,
              SemesterStartDate: "01/01/2020",
              SemesterEndDate: "31/01/2021",
              RegisteredCourses: [
                {
                  CourseCode: "CSE-201",
                  CourseTitle: "Introduction to Computer Science",
                  CourseCredits: 3,
                  CourseGrade: "A",
                  CourseInstructor: "Dr. N Sudhakar",
                  courseRegistrationStatus: "Registered",
                },
                {
                  CourseCode: "CSE-202",
                  CourseTitle: "Comp Sys Fundamentals",
                  CourseCredits: 3,
                  CourseGrade: "A",
                  CourseInstructor: "Dr. Ravi Varma",
                },
              ],
            },
          ],
        },
      ],
      timeTable: {
        CSE: {
          CSEA: {
            Monday: [
              {
                id: 1,
                className: "English",
                startTime: "10:00",
                endTime: "11:00",
              },
              {
                id: 2,
                className: "Math",
                startTime: "11:00",
                endTime: "12:00",
              },
              {
                id: 3,
                className: "Science",
                startTime: "12:00",
                endTime: "13:00",
              },
            ],
            Tuesday: [
              {
                id: 4,
                className: "English",
                startTime: "10:00",
                endTime: "11:00",
              },
              {
                id: 5,
                className: "Math",
                startTime: "11:00",
                endTime: "12:00",
              },
            ],
            Wednesday: [
              {
                id: 6,
                className: "English",
                startTime: "10:00",
                endTime: "11:00",
              },
              {
                id: 2,
                className: "Math",
                startTime: "11:00",
                endTime: "12:00",
              },
              {
                id: 3,
                className: "Science",
                startTime: "12:00",
                endTime: "13:00",
              },
              {
                id: 4,
                className: "English",
                startTime: "13:00",
                endTime: "14:00",
              },
              {
                id: 4,
                className: "English",
                startTime: "14:00",
                endTime: "15:00",
              },
            ],
            Thursday: [
              {
                id: 4,
                className: "English",
                startTime: "13:00",
                endTime: "14:00",
              },
              {
                id: 4,
                className: "English",
                startTime: "14:00",
                endTime: "15:00",
              },
            ],
            Friday: [],
            Saturday: [],
            Sunday: [],
          },
          CSEB: {
            Monday: [
              {
                id: 1,
                className: "English",
                startTime: "10:00",
                endTime: "11:00",
              },
              {
                id: 2,
                className: "Math",
                startTime: "11:00",
                endTime: "12:00",
              },
              {
                id: 3,
                className: "Science",
                startTime: "12:00",
                endTime: "13:00",
              },
            ],
            Tuesday: [
              {
                id: 4,
                className: "English",
                startTime: "10:00",
                endTime: "11:00",
              },
              {
                id: 5,
                className: "Math",
                startTime: "11:00",
                endTime: "12:00",
              },
            ],
            Wednesday: [
              {
                id: 6,
                className: "English",
                startTime: "10:00",
                endTime: "11:00",
              },
              {
                id: 2,
                className: "Math",
                startTime: "11:00",
                endTime: "12:00",
              },
              {
                id: 3,
                className: "Science",
                startTime: "12:00",
                endTime: "13:00",
              },
              {
                id: 4,
                className: "English",
                startTime: "13:00",
                endTime: "14:00",
              },
              {
                id: 4,
                className: "English",
                startTime: "14:00",
                endTime: "15:00",
              },
            ],
            Thursday: [
              {
                id: 4,
                className: "English",
                startTime: "13:00",
                endTime: "14:00",
              },
              {
                id: 4,
                className: "English",
                startTime: "14:00",
                endTime: "15:00",
              },
            ],
            Friday: [],
            Saturday: [],
            Sunday: [],
          },
        },
      },
    },
  },
};
