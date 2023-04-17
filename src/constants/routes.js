export const routes = {
    HOME:"/",
    LOGIN:"/login",
    REGISTER:"/register",
    LOGOUT:"/logout",
    PROFILE_OWN:"/profile",

    CV_LIST:"/cv",
    CV_CREATE:"/cv/create",
    CV_DETAILS:"/cv/:cvId",
    CV_EDIT:"/cv/:cvId/edit",

    WORK_EXP_LIST:"/work-experience",
    WORK_EXP_DETAILS:"/work-experience/:itemId",
    WORK_EXP_CREATE:"/work-experience/create",
    WORK_EXP_EDIT:"/work-experience/:itemId/edit",

    EDUCATION_LIST:"/education",
    EDUCATION_DETAILS:"/education/:itemId",
    EDUCATION_CREATE:"/education/create",
    EDUCATION_EDIT:"/education/:itemId/edit",

    REFERENCES_LIST:"/references",
    REFERENCES_DETAILS:"/references/:itemId",
    REFERENCES_CREATE:"/references/create",
    REFERENCES_EDIT:"/references/:itemId/edit",

    REQUIREMENTS_LIST:"/requirements",
    REQUIREMENTS_DETAILS:"/requirements/:itemId",
    REQUIREMENTS_CREATE:"/requirements/create",
    REQUIREMENTS_EDIT:"/requirements/:itemId/edit",

    CERTIFICATES_LIST:"/certificates",
    CERTIFICATES_DETAILS:"/certificates/:itemId",
    CERTIFICATES_CREATE:"/certificates/create",
    CERTIFICATES_EDIT:"/certificates/:itemId/edit",
}
