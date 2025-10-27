// src/user/routes/appRoutes.js
import { lazy } from "react";

// Lazy load pages
const Dashboard = lazy(() => import("../pages/Dashbord"));
const SeatBooking = lazy(() => import("../pages/SeatBooking"));
const MyAttendance = lazy(() => import("../pages/MyAttendance"));
const AttendancePage2 = lazy(() => import("../pages/Attendance"));
const SeatManagement = lazy(() => import("../pages/SeatManagement"));
const BookingDetails = lazy(() => import("../pages/BookingDetails"));
const StudentAndStafManagement = lazy(() => import("../pages/StudentAndStafManagement"));
const AttendanceManagement = lazy(() => import("../pages/AttendanceManagement"));
const FeesManagement = lazy(() => import("../pages/FeesManagement"));
const AddmissionManagement = lazy(() => import("../pages/AddmissionManagement"));
const FinanceManagement = lazy(() => import("../pages/FinanceManagement"));
const TransactionHistory = lazy(() => import("../pages/TransactionHistory"));
const Setting = lazy(() => import("../pages/Setting"));
const Enquiries = lazy(() => import("../pages/Enquiries"));
const UpdatesGallery = lazy(() => import("../pages/UpdateGallery"));
const AboutUs = lazy(() => import("../pages/AboutUsPage"));
const TermsAndConditions = lazy(() => import("../pages/TermsAndCondition"));
const Onwaiting = lazy(() => import("../pages/Onwaitingpage"));


const ChargesPage = lazy(() => import("../pages/UpdateFeesChargesPage"));

const appRoutes = [
  { path: "/", component: Dashboard, name: "Dashboard" },
  { path: "/booking", component: SeatBooking, name: "Seat Booking" },
  { path: "/attendance", component: MyAttendance, name: "My Attendance" },
  { path: "/history", component: AttendancePage2, name: "Attendance History" },
  { path: "/seatmanagement", component: SeatManagement, name: "Seat Management" },
  { path: "/bookingdetails", component: BookingDetails, name: "Booking Details" },
  { path: "/studentandstaffmanagement", component: StudentAndStafManagement, name: "Student and Staff Management" },
  { path: "/attendancemanagement", component: AttendanceManagement, name: "Attendance Management" },
  { path: "/feesmanagement", component: FeesManagement, name: "Fees Management" },
  { path: "/addmissionmanagement", component: AddmissionManagement, name: "Admission Management" },
  { path: "/financemanagement", component: FinanceManagement, name: "Finance Management" },
  { path: "/transactionhistory", component: TransactionHistory, name: "Transaction History" },
  { path: "/setting", component: Setting, name: "Settings" },
  { path: "/enquiry", component: Enquiries, name: "Enquiries" },
  { path: "/gallery", component: UpdatesGallery, name: "Updates Gallery" },
  { path: "/about", component: AboutUs, name: "About Us" },
  { path: "/term", component: TermsAndConditions, name: "Terms And Conditions" },
  { path: "/onwait", component: Onwaiting, name: "Onwaiting" },

  
  { path: "/charges", component: ChargesPage, name: "Charges" },
];

export default appRoutes;
