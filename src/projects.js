const projects = [
  {
    id: 1,
    projectName: "Todo App",
    projectOwner: "John",
  },
  {
    id: 2,
    projectName: "Catbytes App",
    projectOwner: "Jane",
  },
];

export const useProjects = (project) => {
  return [
    project.projectName,
    function () {
      console.log("Project owner: ", project.projectOwner);
    },
  ];
};

export default projects;
