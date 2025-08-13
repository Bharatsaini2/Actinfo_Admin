import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root";
import Home from "../pages/home";
import CustomersList from "../pages/customers-list";
import CustomersCreate from "../pages/customers-create";
import LoginCreative from "../pages/login-creative";
import ProtectedRoute from "./ProtectedRoute";
import ErrorCreative from "../pages/error-creative";
import CreateCategory from "../pages/create-category";
import CategoryList from "../pages/category-list";
import CategoryView from "../pages/category-view";
import CategoryEdit from "../pages/category-edit";
import AgeGroupList from "../pages/age-group-list";
import CreateAgeGroup from "../pages/age-group-create";
import AgeGroupView from "../pages/age-group-view";
import AgeGroupEdit from "../pages/age-group-edit";
import CountryList from "../pages/country-list";
import CreateCountry from "../pages/country-add";
import CountryView from "../pages/country-view";
import CountryEdit from "../pages/country-edit";
import StateEdit from "../pages/state-edit";
import StateView from "../pages/state-view";
import StateCreate from "../pages/state-add";
import StateList from "../pages/state-list";
import CityList from "../pages/city-list";
import CityCreate from "../pages/city-create";
import CityView from "../pages/city-view";
import CityEdit from "../pages/city-update";
import PostList from "../pages/post-list";
import PostCreate from "../pages/post-add";
import PostView from "../pages/post-view";
import PostEdit from "../pages/post-edit";
import CMSList from "../pages/cms-list";
import CmsCreate from "../pages/cms-add";
import CMSView from "../pages/cms-view";
import CMSEdit from "../pages/cms-update";
import FaqEdit from "../pages/faq-update";
import FaqView from "../pages/Faq-view";
import CreateFaq from "../pages/faq-create";
import FaqList from "../pages/faq-list";
import CouponEdit from "../pages/coupon-edit";
import CouponView from "../pages/coupon-view";
import CouponCreate from "../pages/coupon-create";
import CouponList from "../pages/coupon-list";
import SubscriptonPlanUpdate from "../pages/subscription-plan-edit";
import SubscriptonPlanCreate from "../pages/subscription-plan-add";
import SubscriptonPlanView from "../pages/subscription-plan-view";
import SubscriptionPlanList from "../pages/subscription-plan-list";
import ContestsUpdate from "../pages/contest-update";
import ContestsView from "../pages/contest-view";
import CreateContests from "../pages/contest-create";
import ContestList from "../pages/contest-list";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginCreative />,
    },
    {
        path: "*",
        element: <ErrorCreative />,
    },
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute component={Home} />
            },
            {
                path: "/user/list",
                element: <ProtectedRoute component={CustomersList} />
            },
            {
                path: "/user/create",
                element: <ProtectedRoute component={CustomersCreate} />
            },
            {
                path: "/categories/list",
                element: <ProtectedRoute component={CategoryList} />
            },
            {
                path: "/categories/create",
                element: <ProtectedRoute component={CreateCategory} />
            },
            {
                path: "/categories/view/:id",
                element: <ProtectedRoute component={CategoryView} />
            },
            {
                path: "/categories/update/:id",
                element: <ProtectedRoute component={CategoryEdit} />
            },
            {
                path: "/agegroup/list",
                element: <ProtectedRoute component={AgeGroupList} />
            },
            {
                path: "/agegroup/create",
                element: <ProtectedRoute component={CreateAgeGroup} />
            },
            {
                path: "/agegroup/view/:id",
                element: <ProtectedRoute component={AgeGroupView} />
            },
            {
                path: "/agegroup/update/:id",
                element: <ProtectedRoute component={AgeGroupEdit} />
            },
            {
                path: "/country/list",
                element: <ProtectedRoute component={CountryList} />
            },
            {
                path: "/country/create",
                element: <ProtectedRoute component={CreateCountry} />
            },
            {
                path: "/country/view/:id",
                element: <ProtectedRoute component={CountryView} />
            },
            {
                path: "/country/update/:id",
                element: <ProtectedRoute component={CountryEdit} />
            },
            {
                path: "/state/list",
                element: <ProtectedRoute component={StateList} />
            },
            {
                path: "/state/create",
                element: <ProtectedRoute component={StateCreate} />
            },
            {
                path: "/state/view/:id",
                element: <ProtectedRoute component={StateView} />
            },
            {
                path: "/state/update/:id",
                element: <ProtectedRoute component={StateEdit} />
            },
            {
                path: "/city/list",
                element: <ProtectedRoute component={CityList} />
            },
            {
                path: "/city/create",
                element: <ProtectedRoute component={CityCreate} />
            },
            {
                path: "/city/view/:id",
                element: <ProtectedRoute component={CityView} />
            },
            {
                path: "/city/update/:id",
                element: <ProtectedRoute component={CityEdit} />
            },
            {
                path: "/post/list",
                element: <ProtectedRoute component={PostList} />
            },
            {
                path: "/post/create",
                element: <ProtectedRoute component={PostCreate} />
            },
            {
                path: "/post/view/:id",
                element: <ProtectedRoute component={PostView} />
            },
            {
                path: "/post/update/:id",
                element: <ProtectedRoute component={PostEdit} />
            },
            {
                path: "/cms/list",
                element: <ProtectedRoute component={CMSList} />
            },
            {
                path: "/cms/create",
                element: <ProtectedRoute component={CmsCreate} />
            },
            {
                path: "/cms/view/:id",
                element: <ProtectedRoute component={CMSView} />
            },
            {
                path: "/cms/update/:id",
                element: <ProtectedRoute component={CMSEdit} />
            },
            {
                path: "/faq/list",
                element: <ProtectedRoute component={FaqList} />
            },
            {
                path: "/faq/create",
                element: <ProtectedRoute component={CreateFaq} />
            },
            {
                path: "/faq/view/:id",
                element: <ProtectedRoute component={FaqView} />
            },
            {
                path: "/faq/update/:id",
                element: <ProtectedRoute component={FaqEdit} />
            },
            {
                path: "/coupon/list",
                element: <ProtectedRoute component={CouponList} />
            },
            {
                path: "/coupon/create",
                element: <ProtectedRoute component={CouponCreate} />
            },
            {
                path: "/coupon/view/:id",
                element: <ProtectedRoute component={CouponView} />
            },
            {
                path: "/coupon/update/:id",
                element: <ProtectedRoute component={CouponEdit} />
            },
            {
                path: "/plan/list",
                element: <ProtectedRoute component={SubscriptionPlanList} />
            },
            {
                path: "/plan/create",
                element: <ProtectedRoute component={SubscriptonPlanCreate} />
            },
            {
                path: "/plan/view/:id",
                element: <ProtectedRoute component={SubscriptonPlanView} />
            },
            {
                path: "/plan/update/:id",
                element: <ProtectedRoute component={SubscriptonPlanUpdate} />
            },
            {
                path: "/contest/list",
                element: <ProtectedRoute component={ContestList} />
            },
            {
                path: "/contest/create",
                element: <ProtectedRoute component={CreateContests} />
            },
            {
                path: "/contest/view/:id",
                element: <ProtectedRoute component={ContestsView} />
            },
            {
                path: "/contest/update/:id",
                element: <ProtectedRoute component={ContestsUpdate} />
            },
        ]
    },
])

