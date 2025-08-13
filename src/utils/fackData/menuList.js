export const menuList = [
    {
        id: 0,
        name: "dashboards",
        path: "/",
        icon: 'feather-airplay',
    },
    {
        id: 1,
        name: "user management",
        path: "#",
        icon: 'feather-users',
        dropdownMenu: [
            {
                id: 1,
                name: "Users",
                path: "/user/list",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "User Create",
                path: "/user/create",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 2,
        name: "post management",
        path: "#",
        icon: 'feather-file-text',
        dropdownMenu: [
            {
                id: 1,
                name: "Create Post",
                path: "/post/list",
                subdropdownMenu: false
            },
            // {
            //     id: 2,
            //     name: "Create Age-Group",
            //     path: "/agegroup/list",
            //     subdropdownMenu: false
            // },
        ]
    },
    {
        id: 3,
        name: "setting management",
        path: "#",
        icon: 'feather-settings',
        dropdownMenu: [
            {
                id: 1,
                name: "Create Categories",
                path: "/categories/list",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Create Age-Group",
                path: "/agegroup/list",
                subdropdownMenu: false
            },
            {
                id: 3,
                name: "Add Country",
                path: "/country/list",
                subdropdownMenu: false
            },
            {
                id: 4,
                name: "Add State",
                path: "/state/list",
                subdropdownMenu: false
            },
            {
                id: 5,
                name: "Add City",
                path: "/city/list",
                subdropdownMenu: false
            },
        ]
    },
    {
        id: 4,
        name: "CMS management",
        path: "#",
        icon: 'feather-layout',
        dropdownMenu: [
            {
                id: 1,
                name: "CMS List",
                path: "/cms/list",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Create CMS",
                path: "/cms/create",
                subdropdownMenu: false
            },
        ]
    },
    {
        id: 5,
        name: "FAQ management",
        path: "#",
        icon: 'feather-help-circle',
        dropdownMenu: [
            {
                id: 1,
                name: "FAQ List",
                path: "/faq/list",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Create FAQ",
                path: "/faq/create",
                subdropdownMenu: false
            },
        ]
    },
    {
        id: 6,
        name: "Coupon management",
        path: "#",
        icon: 'feather-tag',
        dropdownMenu: [
            {
                id: 1,
                name: "Coupon List",
                path: "/coupon/list",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Create Coupon",
                path: "/coupon/create",
                subdropdownMenu: false
            },
        ]
    },
    {
        id: 6,
        name: "Subscription Plan",
        path: "#",
        icon: 'feather-dollar-sign',
        dropdownMenu: [
            {
                id: 1,
                name: "Plan List",
                path: "/plan/list",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Create Plan",
                path: "/plan/create",
                subdropdownMenu: false
            },
        ]
    },
    {
        id: 7,
        name: "Contests Management",
        path: "#",
        icon: 'feather-award',
        dropdownMenu: [
            {
                id: 1,
                name: "Contests List",
                path: "/contest/list",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Create Contests",
                path: "/contest/create",
                subdropdownMenu: false
            },
        ]
    },

]
