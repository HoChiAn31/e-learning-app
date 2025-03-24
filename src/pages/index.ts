import LoginPage from './login';
// *************************** leadership ***************************
import HomePage from './leadership/home';
import dataDeclarationPage from './leadership/dataDeclaration/schoolYear';
import DepartmentPage from './leadership/dataDeclaration/department';
import FacultiePage from './leadership/dataDeclaration/facultie';
import ScoreTypePage from './leadership/dataDeclaration/scoreType';
import SubjectPage from './leadership/dataDeclaration/subject';
import studentProfileListPage from './leadership/studentProfileList';
import StudentTransferPage from './leadership/studentProfileList/transfer';
import StudentReservePage from './leadership/studentProfileList/reserve';
import ClassPage from './leadership/dataDeclaration/class';
import InstructorProfileListPage from './leadership/instructorProfileList';
import InstructorAssignmentPage from './leadership/instructorProfileList/assignment';
import SystemSettingsPage from './leadership/systemSettings';
import InforSchoolPage from './leadership/systemSettings/inforSchool';
import EditInforSchoolPage from './leadership/systemSettings/inforSchool/editInforSchool';
import UserSettingPage from './leadership/systemSettings/users';
import ClassSettingPage from './leadership/systemSettings/class';
import SubjectSettingPage from './leadership/systemSettings/subject';
import TranningSettingPage from './leadership/systemSettings/tranning';
// *************************** teacher ***************************
import TeacherClassPage from './teacher/class';
import TeacherDashBoardPage from './teacher/dashboard';
import TeacherClassAddPage from './teacher/classAdd';
import TeacherClassMeetingPage from './teacher/classMeeting';
import TeacherClassDetailPage from './teacher/class/classDetail';
import TeacherListTestPage from './teacher/listTest';
import TeacherListAdd from './teacher/listTest/add';
import TeacherExamSchedulePage from './teacher/examSchedule';
import TeacherNotificationPage from './teacher/notification';
// *************************** student ***************************
import StudentDashBoardPage from './student/dashboard';
import StudentMyClassPage from './student/myClass';
import StudentMeetingPage from './student/classMeeting';
import StudentClassDetailPage from './student/classDetail';
import StudentListTestPage from './student/listTest';
import StudentTestEssayPage from './student/test/Essay';
import StudentTestMultipleChoicePage from './student/test/multipleChoice';
// *************************** shared: teacher & student ***************************
import SharedContactFormPage from './shared/contactForm';
import SharedExamSchedulePage from './shared/examSchedule';
import SharedNotificationPage from './shared/notification';
export {
	LoginPage,
	// *************************** leadership ***************************
	HomePage,
	dataDeclarationPage,
	DepartmentPage,
	FacultiePage,
	ScoreTypePage,
	SubjectPage,
	ClassPage,
	studentProfileListPage,
	StudentTransferPage,
	StudentReservePage,
	InstructorProfileListPage,
	InstructorAssignmentPage,
	SystemSettingsPage,
	InforSchoolPage,
	EditInforSchoolPage,
	UserSettingPage,
	ClassSettingPage,
	SubjectSettingPage,
	TranningSettingPage,
	// *************************** teacher ***************************
	TeacherClassPage,
	TeacherDashBoardPage,
	TeacherClassAddPage,
	TeacherClassMeetingPage,
	TeacherClassDetailPage,
	TeacherListTestPage,
	TeacherListAdd,
	TeacherExamSchedulePage,
	TeacherNotificationPage,
	// *************************** student ***************************
	StudentDashBoardPage,
	StudentMyClassPage,
	StudentMeetingPage,
	StudentClassDetailPage,
	StudentListTestPage,
	StudentTestEssayPage,
	StudentTestMultipleChoicePage,
	// *************************** shared: teacher & student ***************************
	SharedContactFormPage,
	SharedExamSchedulePage,
	SharedNotificationPage,
};
