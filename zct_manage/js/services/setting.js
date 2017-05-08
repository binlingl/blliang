define(['app', 'env','services/common','jquery'], function (myapp, env) {

    myapp.factory('setting', [function () {
        $.ajax({
            url: '/data/dic.json',
            dataType :'json',
            type:'get',
            complete:function(XHR, TS){
                console.log(TS);
            },
            success:function(data, textStatus, jqXHR){
                var d_t = JSON.stringify(data);
                localStorage.setItem('dic', d_t);
            },
            error:function(data){
                console.log(data.responseText);
                localStorage.setItem('dic', data);
            }
        });

        var transformUrl=function(oldurl){
            var newurl ={};
            _.forEach(oldurl, function(v, key) {
                newurl[key]= v.replace(/#\//,'')
            });
            return newurl;
        };

        var setting_ = {};
        if (env == "production") {

            setting_.api_url = "http://api.greatipr.com";
            setting_.other_domains = {
                "greatipr_home": "http://www.greatipr.com",
                "phr": "http://job.greatipr.com",
                "pdeal": "http://shop.greatipr.com",
                "pacademic": "http://academic.greatipr.com",
                "pservice": "http://service.greatipr.com",
                "pdata": "http://search.greatipr.com",
                "papp_center": "http://software.greatipr.com",
                "person_center": "http://user.greatipr.com",
                "poperate": "http://operate.greatipr.com",
                "pservice_sp":"http://service-sp.greatipr.com"
            }
        }

        else if (env == "test") {
            setting_.api_url = "http://api.greatipr.cn";
            setting_.other_domains = {
                "greatipr_home": "http://www.greatipr.cn",
                "phr": "http://job.greatipr.cn",
                "pdeal": "http://shop.greatipr.cn",
                "pacademic": "http://academic.greatipr.cn",
                "pservice": "http://service.greatipr.cn",
                "pdata": "http://search.greatipr.cn",
                "papp_center": "http://software.greatipr.cn",
                "person_center": "http://user.greatipr.cn",
                "poperate": "http://operate.greatipr.cn",
                "pservice_sp":"http://service-sp.greatipr.cn"
            }
        }
        else if (env == "dev") {
            setting_.api_url = "http://api.greatipr.cn";
            setting_.other_domains = {
                "greatipr_home": "http://localhost:10000",
                "phr": "http://localhost:10001",
                "pdeal": "http://localhost:10002",
                "pacademic": "http://localhost:10003",
                "pservice": "http://localhost:10004",
                "pdata": "http://localhost:10005",
                "papp_center": "http://localhost:10006",
                "person_center": "http://localhost:10007",
                "poperate": "http://localhost:10008",
                "pservice_sp":"http://localhost:10009"
            }
        }
        else if (env == "dev_manage") {
              setting_.api_url = "http://api.greatipr.cn:81";
            // setting_.api_url = "http://localhost:8080";
            setting_.other_domains = {
                "greatipr_home": "http://localhost:10000",
                "phr": "http://localhost:10001",
                "pdeal": "http://localhost:10002",
                "pacademic": "http://localhost:10003",
                "pservice": "http://localhost:10004",
                "pdata": "http://localhost:10005",
                "papp_center": "http://localhost:10006",
                "person_center": "http://localhost:10007",
                "poperate": "http://localhost:10008",
                "pservice_sp":"http://localhost:10009"
            }
        }
        var setting= {
            api_url: setting_.api_url,
            //api_url: "http://112.74.97.103",
            client_session_cookie: "client_session",
            username_cookie: "username",
            user_type_cookie: "user_type",
            sp_session_cookie: "sp_session",
            sp_name_cookie: "sp_name",
            sp_type_cookie: "sp_type",
            ueditor_url: setting_.ueditor_url,
            //ueditor_url: "http://10.0.3.216:9090/ueditor/",
            cookies: {
                user: {
                    session: "client_session",
                    name: "username",
                    type: "user_type",
                    class:"user_class",
                    huadee:"huadee_name"
                },
                sp: {
                    session: "sp_session",
                    name: "sp_name",
                    type: "sp_type",
                    class:"user_class",
                    huadee:"huadee_name"
                }
            },
            links: {
                full: {
                    home: "/full_platform/#/index",
                    login: "/full_platform/#/login/new",
                    register: "/full_platform/#/register/new",
                    identity: "/full_platform/#/personal_center/identity?menu=身份认证",
                    forget_password: "/full_platform/#/forget_password/default",
                    personal_profile: "/full_platform/#/personal_center/profile",
                    about: "/full_platform/#/about",
                    about_news: "/full_platform/#/about/news",
                    personal_center_profile: "/full_platform/#/personal_center/profile",
                    personal_center_service_order: "/full_platform/#/personal_center/service_order",
                    personal_center_service_order_wait_sp: "/full_platform/#/personal_center/service_order/wait_sp",
                    personal_center_service_order_running: "/full_platform/#/personal_center/service_order/running",
                    articles_edit: "/full_platform/#/admin/articles/edit/",
                    service_order_detail: "/full_platform/#/service_order_detail/",
                    service_order_show: "/full_platform/#/service_order/show/",
                    service_order_new: "/full_platform/#/service_order/new",
                    transactionCommodity_edit: "/full_platform/#/transaction_commodity/edit/",
                    transactionCommodity_show: "/full_platform/#/transaction_commodity/show/",
                    transactionOrder_buyerShow: "/full_platform/#/transaction_order/buyer_show/",
                    deal_detailed_path:"/pdeal/#/m1/commodity/",
                    deal_detailed_trademark_path:"/pdeal/#/m1/trademark_commodity/",
                    wait_sp: "/full_platform/#/personal_center/service_order/wait_sp",
                    account: "/full_platform/#/personal_center/account",
                    placed: "/full_platform/#/personal_center/transaction_order/buyer/placed?menu=订单管理&title=交易平台",
                    selling: "/full_platform/#/personal_center/transaction_commodity/selling?menu=商品管理",
                    password: "/full_platform/#/personal_center/password?menu=修改密码",
                    academic_resume: "/full_platform/#/personal_center/academic_resume?menu=我的履历",
                    academic_papers_index: "/full_platform/#/personal_center/academic_papers/index?menu=文献管理",
                    academic_favorites: "/full_platform/#/personal_center/academic_favorites?menu=我的收藏"
                },
                pservice: {
                    requirements_result: "/pservice/#requirements/result"

                },
                pservice_sp: {
                    home: "/pservice_sp/#/index"
                },
                pTransaction: {
                    home: "/pdeal/#/m1/home",
                    commodity: "/pdeal/#/m1/commodity/",
                    trademark_commodity: "/pdeal/#/m1/trademark_commodity/",
                    search: "/pdeal/#/m1/search",
                    orderNew: "/pdeal/#/m1/orders/new?commodities=",
                    orderShow: "/pdeal/#/m1/orders/show/",
                    s_patents:"/pdeal/#/m1/s_patents"
                }
            },
            user_type: {
                enterprise: "ENTERPRISE",
                personal: "PERSONAL",
                sp: "SPUSER",
                backenduser: "BACKENDUSER",
                frontend: "FRONTEND"
            },
            user: {
                user_type: {
                    enterprise: "ENTERPRISE",
                    personal: "PERSONAL",
                    sp: "SPUSER",
                    backenduser: "BACKENDUSER",
                    frontend: "FRONTEND"
                },
                userClass: {
                    company: "ENTERPRISE",
                    personal: "PERSONAL"
                },
                userClassLowercase: {
                    company: "enterprise",
                    personal: "personal"
                }
            },
            pservice: {
                order_state: {
                    requirement: "5",
                    bid: "6",
                    placed: "10",
                    reject: "11",
                    receive: "15",
                    confirmed: "20",
                    finished: "25",
                    commented: "30",
                    over: "100"
                },
                flow_type: {
                    bid: "bid",
                    direct: "direct"
                },
                service_type: {
                    patent: "1",
                    trademark: "2"
                }
            },
            pTransaction: {
                commodityState: {
                    draft: "10",
                    placed: "20",
                    selling: "30",
                    rejected: "21",
                    stopSelling: "22",
                    over: "99"
                },
                orderState: {
                    placed: "40",
                    paid: "41",
                    finished: "50",
                    over: "99"
                },
                session: {
                    patentIndustry: "transactionPatentIndustry",
                    areas: "transactionAreas",
                    userIndustry: "transactionUserIndustry"
                },
                queryCondition: {
                    patent: {
                        priceRange: [
                            "全部",
                            "1 - 5000",
                            "5000 - 1万",
                            "1 - 5万",
                            "5 - 10万",
                            "10 - 20万",
                            "20 - 50万",
                            "50 - 100万",
                            "100万 +",
                            "面议"
                        ],
                        type: [
                            "全部",
                            "发明专利",
                            "实用新型专利",
                            "外观设计专利"
                        ]
                    },
                    trademark:{
                        languageTypes:[
                            "全部",
                            "中文",
                            "英文",
                            "中文-英文"
                        ],
                        areas:[
                            "全部",
                            "中国大陆",
                            "台湾",
                            "香港",
                            "澳门",
                            "美国",
                            "加拿大"
                        ]
                    }
                }
            },
            pacademic: {
                scopes: [
                    "知识产权",
                    "专利",
                    "商标",
                    "版权",
                    "著作权",
                    "反垄断",
                    "反不正当竞争",
                    "非物质遗产",
                    "生物多样性",
                    "传统知识",
                    "许可经营",
                    "域名",
                    "集成电路布图设计",
                    "遗传资源",
                    "商业秘密\\技术秘密",
                    "其他"
                ]
            },
            environment: {
                develop: "develop",
                test: "test",
                production: "production"
            },
            Uploader: {
                options: {
                    default: {
                        server: setting_.api_url + '/api/file/upload',
                        //限制文件个数
                        fileNumLimit: 20,
                        fileSingleSizeLimit: 20971520,
                        //pick: '#uploader',
                        resize: false,
                        threads:10
                    }
                }
            },
            website: {
                icp: "粤ICP备16007696号-1"
            },
            form_pattern: {
                //邮箱
                email_pattern: "/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/",
                //手机
                phone_pattern: "/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i",

                date_pattern: "/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$)/",

                card_id:"/\d{15}|\d{17}[0-9Xx]/",

                folat_t:"/^[0-9]+\.{0,1}[0-9]{0,2}$/",

                zimu:"/^([A-Za-z]+\s?)*[A-Za-z]$/"
            }  ,
            url_href:{
                api_url:setting_.api_url,
                down_img:setting_.api_url+"/api/file/download_img",
                down_file:setting_.api_url+"/api/file/download_file",
                phr:setting_.other_domains.phr,
                pdeal:setting_.other_domains.pdeal,
                pacademic:setting_.other_domains.pacademic,
                pservice:setting_.other_domains.pservice,
                papp_center:setting_.other_domains.papp_center,
                pdata:setting_.other_domains.pdata,
                greatipr_home:setting_.other_domains.greatipr_home,
                person_center:setting_.other_domains.person_center,
                register_agreement:setting_.other_domains.person_center+"/#/account/register_agreement",
                forget_password:setting_.other_domains.person_center+"/#/account/password/default",
                address:setting_.other_domains.person_center+"/#/personal_center/address",
                home:setting_.other_domains.pdeal+"/#/home",
                partent:setting_.other_domains.pdeal+"/#/patents.html",
                trademark:setting_.other_domains.pdeal+"/#/trademarks",
                loginOut:setting_.other_domains.person_center+"/#/account/login",
                //register:setting_.other_domains.person_center+'/#/register/new',
                register:setting_.other_domains.person_center+'/#/account/register',

                personal_p:setting_.other_domains.person_center+'/#/userinfo/profile/edit?menu=个人信息',
                personal_e:setting_.other_domains.person_center+'/#/userinfo/profile/edit?menu=企业信息',

                personal:setting_.other_domains.person_center+'/#/userinfo/profile/edit',
                deal_selling:setting_.other_domains.person_center+'/#/personal_center/transaction_commodity/selling',

                identity:setting_.other_domains.person_center+"/#/userinfo/identity/edit?menu=身份认证",

                order_manage:setting_.other_domains.person_center+"/#/pdeal/bill_manage/buyer_placed?menu=订单管理&title=交易平台",
                transaction_manage:setting_.other_domains.person_center+"/#/personal_center/transaction_commodity/selling?menu=商品管理",
                enterprise_manage:setting_.other_domains.greatipr_home+"/#/about/company",
                news:setting_.other_domains.greatipr_home+"/#/about/news",
                contact_us:setting_.other_domains.greatipr_home+"/#/about/contact_us",
                cooperation:setting_.other_domains.greatipr_home+"/#/about/cooperation",
                about_us:setting_.other_domains.greatipr_home+"/#/aboutus",//关于我们
                //register_now:setting_.other_domains.person_center+"/#/register/new",
                register_now:setting_.other_domains.person_center+"/#/account/register",

                //人力资源平台职位
                hr_position:setting_.other_domains.phr+"/#/position_show?position_id=",
                hr_position_suffix:setting_.other_domains.phr+"/#/",
                position_index:setting_.other_domains.phr+"/#/position_index",
                patents_index:setting_.other_domains.pdeal+"/#/s_patents/search.html?s_type=patent",
                patent_commodity:setting_.other_domains.pdeal+'/#/',
                position_search:setting_.other_domains.phr+"/#/position_index?search_content=",
                patent_search:setting_.other_domains.pdeal+"/#/s_patents/search.html?s_type=patent&keyword=",
                experts_index:setting_.other_domains.pacademic+"/#/m1/experts/index",
                papers_index:setting_.other_domains.pacademic+"/#/m1/papers/index",
                experts_show:setting_.other_domains.pacademic+"/#/m1/experts/show/",
                papers_show:setting_.other_domains.pacademic+"/#/m1/papers/show/",
                file_image:setting_.api_url+"/api/file/download_img/",

                //academic_papers_index: setting_.other_domains.person_center+"/#/personal_center/academic_papers/index?menu=文献管理",
                academic_papers_index: setting_.other_domains.person_center+"/#/pacademic/document_manage/list?menu=文献管理",

                academic_favorites: setting_.other_domains.person_center+"/#/pacademic/personal_favorites/list?menu=我的收藏",
                hr_position_activity:setting_.other_domains.phr+"/#/activity",
                //resumeIndex
                resumeIndex:setting_.other_domains.person_center+'/#/resumeIndex',
                resume:setting_.other_domains.person_center+'/#/personal_center/resume',

                //commodity:environment.other_domains.pdeal
                hr_notice:setting_.other_domains.phr+"/huodong0.html",
                //首页资讯
                com_news:setting_.other_domains.greatipr_home+"/#/news_list/"

            }
        };
        if (document.domain.indexOf("jobipr") > -1) {
            setting_.other_domains.person_center = setting_.other_domains.person_center.replace(/greatipr/, 'jobipr');
        }
        if(env=="dev"){

        }else if(env=="test"){
            setting.url_href=transformUrl(setting.url_href);

        }else if(env=="production"){
            setting.url_href=transformUrl(setting.url_href);
        };
        setting_.p_service_data = function (s) {

            s.trademake_service_no = 2;
            s.patent_service_no = 1;

            //初始化专利和商标服务类型配置
            if (common.is_exist(common.getJsonFromSessionStorage("service_type")) &&
                common.is_exist(common.getJsonFromSessionStorage("patent_service_type")) &&
                common.is_exist(common.getJsonFromSessionStorage("trademake_service_type"))) {
                s.service_type = common.getJsonFromSessionStorage("service_type");
                s.patent_service_type = common.getJsonFromSessionStorage("patent_service_type");
                s.trademake_service_type = common.getJsonFromSessionStorage("trademake_service_type");
            } else {

                s.service_type = [];
                s.patent_service_type = [];
                s.trademake_service_type = [];

                s.apis.dictionary.patent_service_type().success(function (data) {
                    if (data.logicstate == 0) {
                        common.setJsonToSessionStorage("patent_service_type", data.data);
                        s.patent_service_type = common.getJsonFromSessionStorage("patent_service_type");
                        s.service_type = s.service_type.concat(s.patent_service_type);
                        common.setJsonToSessionStorage("service_type", s.service_type);
                    } else {

                    }
                });
                s.apis.dictionary.trademake_service_type().success(function (data) {
                    if (data.logicstate == 0) {
                        common.setJsonToSessionStorage("trademake_service_type", data.data);
                        s.trademake_service_type = common.getJsonFromSessionStorage("trademake_service_type");
                        s.service_type = s.service_type.concat(s.trademake_service_type);
                        common.setJsonToSessionStorage("service_type", s.service_type);
                    } else {

                    }
                });
            }

            //初始化行业和技术领域配置
            if (common.is_exist(common.getJsonFromSessionStorage("patent_industry_technology"))) {
                s.patent_industry_technology = common.getJsonFromSessionStorage("patent_industry_technology");
            } else {
                s.patent_industry_technology = [];
                s.apis.dictionary.patent_industry_technology().success(function (data) {
                    if (data.logicstate == 0) {
                        common.setJsonToSessionStorage("patent_industry_technology", data.data);
                        s.patent_industry_technology = common.getJsonFromSessionStorage("patent_industry_technology");
                    } else {

                    }
                });
            }
        };

        setting_.pTransactionData = function (s) {

            var transactionPatentIndustry = common.getJsonFromSessionStorage(config.pTransaction.session.patentIndustry);
            if (common.is_exist(transactionPatentIndustry)) {
                s.transactionPatentIndustry = transactionPatentIndustry;
            } else {
                s.apis.dictionary.dealPatentIndustry()
                    .success(function (data) {
                        if (data.logicstate == 0) {
                            common.setJsonToSessionStorage(config.pTransaction.session.patentIndustry, data.data);
                            s.transactionPatentIndustry = common.getJsonFromSessionStorage(config.pTransaction.session.patentIndustry);
                        } else {

                        }
                    });
            }

            var transactionUserIndustry = common.getJsonFromSessionStorage(config.pTransaction.session.userIndustry);
            if (common.is_exist(transactionUserIndustry)) {
                s.transactionUserIndustry = transactionUserIndustry;
            } else {
                s.apis.dictionary.get_deal_industry('user')
                    .success(function (data) {
                        if (data.logicstate == 0) {
                            common.setJsonToSessionStorage(config.pTransaction.session.userIndustry, data.data);
                            s.transactionUserIndustry = common.getJsonFromSessionStorage(config.pTransaction.session.userIndustry);
                        } else {

                        }
                    });
            }

            var transactionAreas = common.getJsonFromSessionStorage(config.pTransaction.session.areas);
            if (common.is_exist(transactionAreas)) {
                s.transactionAreas = transactionAreas;
            } else {
                s.apis.dictionary.get_area_t()
                    .success(function (data) {
                        if (data.logicstate == 0) {
                            common.setJsonToSessionStorage(config.pTransaction.session.areas, data.data);
                            s.transactionAreas = common.getJsonFromSessionStorage(config.pTransaction.session.areas);
                        } else {

                        }
                    });
            }

        };
        return setting;
    }
    ]);
});

