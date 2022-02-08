import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Home/Main'
import Company from '@/components/Company/Main'
import Loan from '@/components/Loan/Main'
import Counseling from '@/components/Counseling/Main'
import Customer from '@/components/Customer/Main'
import Guide from '@/components/Guide/Main'


Vue.use(Router)

export default new Router({
    mode:'hash',
    routes :[
        {
            path: '/',
            component: Main
        },
        {
            path: '/company/:page',
            component: Company
        },
        {
            path: '/loan/:page',
            component: Loan
        },
        {
            path: '/counseling/:page',
            component: Counseling
        },
        {
            path: '/customer/:page',
            component: Customer
        },
        {
            path: '/guide/:page',
            component: Guide
        }
    ]
}) 


