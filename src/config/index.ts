const config = {
	// Leadership
	home: '/home',
	login: '/',
	dataDeclaration: '/dataDeclaration',
	department: '/dataDeclaration/department',
	facultie: '/dataDeclaration/facultie',
	subject: '/dataDeclaration/subject',
	class: '/dataDeclaration/class',
	scoreType: '/dataDeclaration/scoreType',
	studentProfileList: '/studentProfileList/all',
	studentTransfer: '/studentProfileList/transfer',
	studentReserve: '/studentProfileList/reserve',
	instructorProfileList: '/instructorProfileList/all',
	instructorAssignment: '/instructorProfileList/assignment',

	systemSettings: '/systemSettings',
	inforSchool: '/systemSettings/inforSchool',
	inforSchoolEditor: '/systemSettings/inforSchool/editor',
	userSettings: '/systemSettings/users',
	classSettings: '/systemSettings/class',
	subjectSettings: '/systemSettings/subject',
	tranningSettings: '/systemSettings/tranning',
	configSettings: '/systemSettings/config',

	// teacher
	teacherDashboard: '/teacher/dashboard',
	teacherClass: '/teacher/class/list',
	teacherClassDetail: '/teacher/class/list/:id',

	teacherClassAdd: '/teacher/class/add',
	teacherClassMeeting: '/teacher/class/meeting',
	teacherListTest: '/teacher/listTest/all',
	teacherListTestAdd: '/teacher/listTestAdd',
	teacherExamSchedule: '/teacher/examSchedule',
	teacherNotification: '/teacher/notification',

	// student
	studentDashboard: '/student/dashboard',
	studentClassDetail: '/student/class/detail/:id',
	studentMeeting: '/student/myClass/meeting',
	studentMyClass: '/student/myClass/list',
	studentListTest: '/student/listTest/all',
	StudentTestEssay: '/student/test/essay',
	StudentTestmultipleChoice: '/student/test/multipleChoice',

	// shared: teacher & student
	sharedContactForm: '/shared/contactForm',
	sharedExamSchedule: '/shared/calendar',
	sharedNotification: '/shared/notification',
};
export default config;
