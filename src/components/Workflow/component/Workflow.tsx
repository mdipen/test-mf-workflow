import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import 'react-multi-carousel/lib/styles.css';
import { Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import HtmlReactParser from 'html-react-parser';
import { useTranslation } from 'react-i18next';

import { Toaster } from '../../../utils/helper';
import Milestone from '../../Milestone/components/Milestone';
import MileStoneBlock from '../../MilestoneBlock/components/MilestoneBlock';
import MileStoneButtonGroup from '../../MilestoneButtonGroup/components/MilestoneButtonGroup';
import WorkflowLoader from '../../Loader/WorkflowLoader';
import { getWorkflowAction } from '../action/getWorkflow.actions';
import '../../../assets/style/workflow.scss';
import '../../../assets/style/workflow-color.scss';
import Link from './Link';
import Error from '../../Error/components/Error';
import {
    isDependentMilestoneComplete,
    isLastWMilestone,
} from '../../../common/validation';
import { HttpStatus, STATUS } from '../../../utils/constants';
import { useQuery } from '../../../common/query.params';
import { useScrollHandler } from '../../../hooks/useScrollHandler';
import { IMileStone } from '../../../common/interface';
import RewardsDetails from './rewardsDetails';

const handlePageTitleFavIcon: any = () => {
    document.title = Cookies.get('pageTitle')
        ? Cookies.get('pageTitle')
        : document.title;
    const favicon: any = document.getElementById('favicon');
    if (favicon) {
        favicon.href = Cookies.get('favIconUrl');
    }
};

const handleStatus = (workflow) => {
    let milestoneIdToStart = '';
    let hasInProgressMilestone = false;
    if (workflow) {
        workflow.milestones.forEach((task) => {
            if (task.status === STATUS.inProgress) {
                hasInProgressMilestone = true;
            }
        });

        if (!hasInProgressMilestone) {
            for (const mileStone of workflow.milestones) {
                if (mileStone.status === STATUS.notStarted) {
                    milestoneIdToStart = mileStone._id;
                    break;
                }
            }
        }
    }
    return milestoneIdToStart;
};

const WorkFlow: React.FC = () => {
    const params: any = useParams();
    const history = useHistory();
    const { id } = params;
    const query = useQuery();
    const headerScroll = useScrollHandler();
    const [showCssLoader, setShowCssLoader] = React.useState(true);
    const [currentMileStoneId, setCurrentMileStoneId] = React.useState('');
    const [currentMileStone, setCurrentMileStone] = React.useState({} as any);
    const milestoneScrollRef = React.useRef(null);

    const { t } = useTranslation();

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getWorkflowAction(id));
    }, [dispatch, id]);

    const workflow = useSelector((state: any) => {
        return state.workflow.data && state.workflow.data.data;
    });

    const workflowLoading = useSelector((state: any) => {
        return state.workflow.loading;
    });

    const milestoneIdToStart = handleStatus(workflow);

    const error = useSelector((state: any) => {
        if (state.workflow.error) {
            return state.workflow.errorDetails;
        }
        if (state.task.error) {
            return state.task.errorDetails;
        }
    });
    const defaultErrors = useSelector((state: any) => {
        if (state.taskBlock.error) {
            return state.taskBlock.errorDetails;
        }
        if (state.taskComplete.error) {
            return state.taskComplete.errorDetails;
        }
    });

    const navigateToCTALink = (milestone: IMileStone) => {
        const link = milestone.milestoneCTA
            ? milestone.milestoneCTA.link
            : null;
        if (link) {
            if (link.startsWith('#')) {
                const rediredctSequence = parseInt(link.substring(1));
                if (!rediredctSequence) {
                    const currentMileStone = workflow.milestones.find(
                        (milestone) => milestone._id === currentMileStoneId,
                    );
                    const nextSequence = currentMileStone.sequence + 1;
                    const nextMilestone = workflow.milestones.find(
                        (milestone) => milestone.sequence === nextSequence,
                    );
                    if (nextMilestone) {
                        setCurrentMileStoneId(nextMilestone._id);
                    }
                } else if (isNaN(rediredctSequence)) {
                    return;
                } else {
                    const redirectMilestone = workflow.milestones.find(
                        (milestone) => milestone.sequence === rediredctSequence,
                    );
                    if (redirectMilestone) {
                        setCurrentMileStoneId(redirectMilestone._id);
                    }
                }
            } else {
                window.location.href = link;
            }
        }
    };
    const scrollDown = (ref) => {
        if (!ref || !ref.current) {
            return;
        }
        window.scroll({
            top: ref.current.offsetTop,
            behavior: 'smooth',
        });
    };

    React.useEffect(() => {
        if (workflow && workflow.milestones && currentMileStoneId) {
            const currentMileStone = workflow.milestones.find(
                (milestone) => milestone._id === currentMileStoneId,
            );
            setCurrentMileStone(currentMileStone);
        }
        if (currentMileStoneId) {
            history.replace({
                // eslint-disable-next-line no-restricted-globals
                pathname: location.pathname,
                search: `?milestoneId=${currentMileStoneId}`,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMileStoneId, workflow]);

    React.useEffect(() => {
        if (currentMileStone && currentMileStone._id) {
            scrollDown(milestoneScrollRef);
        }
    }, [currentMileStone]);

    React.useEffect(() => {
        const mileStoneId = query.get('milestoneId');
        if (workflow && mileStoneId) {
            setCurrentMileStoneId(mileStoneId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workflow]);

    if (workflow && !workflow.customStyleUrl && showCssLoader) {
        setShowCssLoader(false);
    }

    React.useEffect(() => {
        handlePageTitleFavIcon();
    }, []);

    React.useEffect(() => {
        let errorMessage = t('ErrorLabelDefault');
        if (defaultErrors) {
            switch (defaultErrors.errorStatusCode) {
                case HttpStatus.BAD_REQUEST:
                    errorMessage = t('ErrorLabel400');
                    break;
                case HttpStatus.UNAUTHORIZED:
                    errorMessage = t('ErrorLabel401');
                    break;
                case HttpStatus.FORBIDDEN:
                    errorMessage = t('ErrorLabel403');
                    break;
                case HttpStatus.NOT_FOUND:
                    errorMessage = t('ErrorLabel404Data');
                    break;
            }
            Toaster.error(errorMessage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultErrors]);

    return (
        <>
            {error && <Error errorObject={error} workflowId={id} />}
            {!error && (showCssLoader || workflowLoading) && (
                <WorkflowLoader
                    transparent={true}
                    position={'fixed'}
                    loaderFirstText={
                        (!workflow || showCssLoader) && t('oneMomentPlease')
                    }
                    loaderSecondText={
                        (!workflow || showCssLoader) &&
                        t('weAreLoadingYourSmartWorkflow')
                    }
                />
            )}
            {workflow && workflow.customStyleUrl && (
                <Link
                    key={workflow.customStyleUrl}
                    externalCssLink={workflow.customStyleUrl}
                    setShowCssLoader={setShowCssLoader}
                />
            )}
            {!error && !showCssLoader && (
                <div
                    className={`workflow-page-container wf-cyber-security ${
                        headerScroll ? 'scroll-shadow' : ''
                    }`}
                >
                    {workflow &&
                        workflow.displayElements &&
                        workflow.displayElements.header &&
                        HtmlReactParser(workflow.displayElements.header)}
                    {/*  TODO - Ingram Cloud Cyber Security header  */}
                    {/* <header className="wf-top-header white-bg ingram-cloud-cyber-header">
                        <div className="wf-header-first-logo">
                            <img
                                alt=""
                                height=""
                                src="https://login.structuredweb.com/sw/themes/5/images/head_109.gif"
                            />
                        </div>
                        <div className="wf-top-header-label">
                            <a
                                className="marketplace-btn"
                                href="https://us.cloud.im/go/dashboard/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                SHOP CLOUD MARKETPLACE
                            </a>
                        </div>
                    </header>

                    <div
                        id="mainNav"
                        className="navHolder tabs-width-default ingram-cloud-cyber-nav"
                    >
                        <ul id="TabList" className="nav navbar-nav">
                            <li id="tab_SW_TABS_1455" className="sw-tab">
                                <a href="/sw/app/Marketing/CPage.aspx?Tab=1455&amp;TMID=1549&amp;pageContext=HomePage">
                                    Home
                                </a>
                            </li>
                            <li className="sw-tab" id="tab_SW_TABS_1456">
                                <a href="/sw/app/Marketing/CPage.aspx?Tab=1456&amp;TMID=1550&amp;pageContext=CybersecurityOverview">
                                    Cybersecurity
                                </a>
                            </li>
                            <li
                                className="hasSubMenus sw-tab"
                                id="tab_SW_TABS_1558"
                            >
                                <a href="/sw/app/Marketing/CPage.aspx?Tab=1558&amp;TMID=1652&amp;pageContext=EnablementGetStarted">
                                    Enablement
                                </a>
                                <ul className="subMenu">
                                    <li id="tab_SW_TABS_1559">
                                        <a href="/sw/app/Marketing/CPage.aspx?Tab=1559&amp;TMID=1653&amp;pageContext=Training">
                                            Training
                                        </a>
                                    </li>
                                    <li id="tab_SW_TABS_1815">
                                        <a href="/sw/app/Marketing/CPage.aspx?Tab=1815&amp;TMID=1909&amp;pageContext=CUSTOM_CAMPAIGN_20">
                                            Certifications
                                        </a>
                                    </li>
                                    <li id="tab_SW_TABS_1560">
                                        <a href="/sw/app/Marketing/CPage.aspx?Tab=1560&amp;TMID=1654&amp;pageContext=Tools_and_Services">
                                            Tools &amp; Services
                                        </a>
                                    </li>
                                    <li id="tab_SW_TABS_1561">
                                        <a href="/sw/app/Marketing/Library/CampaignPreview.aspx?Tab=1561&amp;TMID=1655&amp;CampaignID=60449">
                                            Marketing University
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="hasSubMenus sw-tab"
                                id="tab_SW_TABS_1578"
                            >
                                <a href="/sw/app/Marketing/CPage.aspx?Tab=1578&amp;TMID=1672&amp;pageContext=CampaignsGetStarted">
                                    Marketing
                                </a>
                                <ul className="subMenu">
                                    <li id="tab_SW_TABS_1579">
                                        <a href="/sw/app/Marketing/CPage.aspx?Tab=1579&amp;TMID=1673&amp;pageContext=GetStarted">
                                            Get Started
                                        </a>
                                    </li>
                                    <li id="tab_SW_TABS_1580">
                                        <a href="/sw/app/Marketing/Campaign/Account/CustomCampaigns.aspx?Tab=1580&amp;TMID=1674">
                                            Product Campaigns
                                        </a>
                                    </li>
                                    <li id="tab_SW_TABS_1581">
                                        <a href="/sw/app/Marketing/CPage.aspx?Tab=1581&amp;TMID=1675&amp;pageContext=SOLUTION_MARKETING_CAMPAIGNS">
                                            Solution Campaigns
                                        </a>
                                    </li>
                                    <li id="tab_SW_TABS_1835">
                                        <a href="/sw/app/Marketing/CPage.aspx?Tab=1835&amp;TMID=1929&amp;pageContext=Webinars">
                                            Webinar &amp; Events
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="hasSubMenus sw-tab"
                                id="tab_SW_TABS_1481"
                            >
                                <a href="/sw/app/Marketing/CPage.aspx?Tab=1481&amp;TMID=1575&amp;pageContext=MyMarketingGetStarted">
                                    My Marketing
                                </a>
                                <ul className="subMenu">
                                    <li id="tab_SW_TABS_1555">
                                        <a href="/sw/swchannel/MarketingCenter/intranet/Campaigns.cfm?Tab=1555&amp;TMID=1649&amp;List=Email">
                                            Email Marketing
                                        </a>
                                    </li>
                                    <li id="tab_SW_TABS_1482">
                                        <a href="/sw/swchannel/MarketingCenter/intranet/Campaigns.cfm?Tab=1482&amp;TMID=1576&amp;List=Social">
                                            Social Marketing
                                        </a>
                                    </li>
                                    <li id="tab_SW_TABS_1556">
                                        <a href="/sw/swchannel/MarketingCenter/intranet/Campaigns.cfm?Tab=1556&amp;TMID=1650&amp;List=Banner">
                                            Banner Ads
                                        </a>
                                    </li>
                                    <li id="tab_SW_TABS_1484">
                                        <a href="/sw/swchannel/MarketingCenter/intranet/Campaigns.cfm?Tab=1484&amp;TMID=1578&amp;List=ContentSyndication">
                                            Content Syndication
                                        </a>
                                    </li>
                                    <li
                                        id="tab_SW_TABS_1557"
                                        className="border-top-menu"
                                    >
                                        <a href="/sw/swchannel/MarketingCenter/Assets/intranet/Assets.cfm">Account Profile</a>
                                    </li>
                                    <li id="tab_SW_TABS_1485">
                                        <a href="/sw/swchannel/CustomerCenter/intranet/Customers.cfm?Tab=1485&amp;TMID=1579">
                                            Contacts
                                        </a>
                                    </li>
                                    <li id="tab_SW_TABS_1486">
                                        <a href="/sw/swchannel/CustomerCenter/intranet/Groups.cfm?Tab=1486&amp;TMID=1580">
                                            Groups
                                        </a>
                                    </li>
                                    <li id="tab_SW_TABS_1583">
                                        <a href="/sw/swchannel/MarketingCenter/intranet/Reports/Reports.cfm?Tab=1583&amp;TMID=1677&amp;SelectedReport=%2fsw%2fswchannel%2fMarketingCenter%2fPrograms%2fintranet%2fReports%2fAllTacticsByAccount">
                                            Reports
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div> */}

                    {/* TODO - Banner section for ingram cloud cyber security */}
                    {/* <div className="wf-banner">
                        <div className="wf-banner-wrapper">
                            <div className="wf-banner-left">
                                <div className="wf-banner-left-logo">
                                    <svg
                                        width="692"
                                        height="149"
                                        viewBox="0 0 692 149"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M663.04 20.1201C663.04 14.3001 667.78 9.56006 673.6 9.56006C679.42 9.56006 684.16 14.3001 684.16 20.1201C684.16 25.9401 679.42 30.6801 673.6 30.6801C667.78 30.6701 663.04 25.9401 663.04 20.1201ZM681.59 20.1201C681.59 15.1801 678.02 11.6101 673.61 11.6101C669.19 11.6101 665.63 15.1801 665.63 20.1201C665.63 25.0601 669.2 28.6301 673.61 28.6301C678.02 28.6301 681.59 25.0601 681.59 20.1201ZM669.54 14.0901H673.98C676.85 14.0901 678.4 15.0801 678.4 17.6001C678.4 19.6501 677.23 20.6401 675.27 20.8201L678.49 26.0501H676.21L673.11 20.9001H671.76V26.0501H669.54V14.0901ZM671.76 19.2101H673.72C675.04 19.2101 676.18 19.0301 676.18 17.4301C676.18 16.0301 674.89 15.7901 673.75 15.7901H671.76V19.2101Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M303.98 80.83C303.98 80.83 311.84 80.83 315.74 80.83C325.35 80.83 329.36 75.87 329.36 69.78C329.36 62.01 322.74 58.96 315.74 58.96C311.58 58.96 303.98 58.96 303.98 58.96V80.83ZM412.35 58.04L401.3 91.94H424.09L412.93 58.04H412.35ZM11.6 35.96H51.15C51.15 35.96 51.09 104.27 51.09 138.76C50.85 138.76 11.84 138.78 11.6 138.76C11.6 138.76 11.6 35.96 11.6 35.96ZM608.46 35.96V138.76H572.81V58.24H572.3L551.82 138.76H518.91L498.51 58.24H497.96V138.76H435.63L429.42 116.62H395.92L389.71 138.76H330.14C330.14 138.76 328.12 123.61 327.6 119.82C325.84 107.08 321.99 104 314.39 104C309.77 104 303.99 104 303.99 104V138.76H242.97C260.55 134.76 276.42 126.78 285.52 121.28L272.71 72.69L238.64 81.67L245.91 109.23C243.77 110.74 236.68 113.23 231.82 113.23C215.55 113.23 207.81 96.93 207.81 82.88C207.81 60.27 230.85 51.57 251.16 51.57C255.88 51.57 261.98 51.98 262.84 52.08L258.59 35.95C288.62 35.95 322.7 35.95 329.6 35.95C358.02 35.95 369.04 49.42 369.04 63.75C369.04 85.46 348.34 89.54 344.39 90.24C344.33 90.25 344.33 90.85 344.39 90.86C352.66 92.43 358.74 96.44 362.62 103.42C362.49 103.19 384.37 41.61 386.35 35.96H440.94L463.97 100.43H464.28V35.96H522.99C522.99 35.96 536.59 92.25 536.67 92.25C541.11 73.51 550 35.96 550 35.96H608.46ZM204.11 138.76H120.89C114.45 114.85 100.8 64.36 100.8 64.36H100.56V138.76H66.54V35.96H125.6C131.82 59.67 144.84 108.45 144.84 108.45H145.08V35.96H179.18V51.58C170.87 60.35 165.83 71.57 165.83 85.65C165.82 105.85 177.17 130.91 204.11 138.76ZM656.91 125.49V129.02L638.99 134.32V134.44H656.91V138.76H634.92V130.72L648.09 126.87L634.92 122.83V114.79H656.91V119.92H639V120.05L656.91 125.49ZM656.91 103.37H634.92V108.5H656.91V103.37ZM643.1 79.65C637.81 80.23 634.6 83.04 634.6 88.56C634.6 95.16 639.82 98.43 645.91 98.43C651.9 98.43 657.22 95.26 657.22 88.72C657.22 83.65 654.24 80.19 649.21 79.65L648.89 84.65C651.01 84.94 653.02 86.06 653.02 88.47C653.02 92.35 649.14 92.7 646.13 92.7C643.47 92.7 638.73 92.35 638.73 88.73C638.73 85.91 641 85.07 643.44 85.05L643.1 79.65ZM648.22 69.63V65.88L656.91 62.51V56.8L647.2 60.87C646.33 58.5 644.02 57.06 641.53 57.06C637.47 57.06 634.93 59.71 634.93 65V74.75H656.92V69.62L648.22 69.63ZM638.83 69.63V65.7C638.83 63.27 640.37 62.38 641.61 62.38C642.99 62.38 644.44 63.31 644.44 65.7V69.63H638.83V69.63ZM657.23 43.72C657.23 38.2 653 34.36 645.88 34.36C640.75 34.36 634.6 36.91 634.6 43.72C634.6 50.23 640.05 53.15 645.88 53.15C651.8 53.14 657.23 50.23 657.23 43.72ZM638.8 43.72C638.8 40.9 641.51 39.75 645.92 39.75C650.24 39.75 653.04 40.8 653.04 43.72C653.04 47.34 648.65 47.76 645.89 47.76C641.49 47.76 638.8 46.6 638.8 43.72Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                <div className="wf-banner-welcome">
                                    Welcome to our
                                </div>
                                <div className="wf-banner-title">
                                    PRACTICE BUILDER PROGRAM
                                </div>
                                <div className="wf-banner-des">
                                    Cloud is crowded. And building a
                                    cybersecurity practice has never been an
                                    easy task. Gain your competitive edge
                                    through a tailored journey with targeted
                                    cyber trainings, tools & services as well as
                                    marketing content that cuts through the
                                    noise.
                                </div>
                            </div>
                            <div className="wf-banner-right">
                                <div className="wf-banner-right-img-wrap">
                                    <img src="https://login.structuredweb.com/sw/swchannel/images/users/215454/welcome/Banner_Feature_person.png" />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <section className="workflow-section wf-cyber-security-padding0 ">
                        <div className="workflow-svg-bottom wf-cyber-security-none">
                            <svg
                                width="538"
                                height="451"
                                viewBox="0 0 538 451"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M538 408L23 405L92.5 450.5L538 408Z"
                                    fill="#0773BB"
                                />
                                <path
                                    d="M72 405H22.5L-113 0L72 405Z"
                                    fill="#17B68D"
                                />
                            </svg>
                        </div>
                        <div className="workflow-svg-top wf-cyber-security-none">
                            <svg
                                width="629"
                                height="809"
                                viewBox="0 0 629 809"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M857.581 453.634L452.882 665.379L553.021 671.298L738.625 553.607L857.581 453.634Z"
                                    fill="#0773BB"
                                />
                                <path
                                    d="M507.886 636.286L452.528 665.608L172.106 419.464L0 275.199L507.886 636.286Z"
                                    fill="#17B68D"
                                />
                            </svg>
                        </div>
                        <Container className="workflow-container wf-cyber-security-none">
                            <h1 className="wf-header-name">
                                {workflow && workflow.name}
                            </h1>
                            <p className="wf-header-description">
                                {workflow && workflow.description}
                            </p>
                        </Container>

                        {workflow && workflow.customDisplayContent && (
                            <>
                                {HtmlReactParser(workflow.customDisplayContent)}
                            </>
                        )}
                        <Container className="workflow-container">
                            {workflow && workflow.resourceDetails && (
                                <div className="wf-resource-section">
                                    <div className="workflow-resource-info">
                                        <span className="wf-resource-header">
                                            {workflow &&
                                                workflow.resourceDetails &&
                                                workflow.resourceDetails.header}
                                        </span>
                                        <span className="wf-resource-description">
                                            {workflow &&
                                                workflow.resourceDetails &&
                                                workflow.resourceDetails
                                                    .description}
                                        </span>
                                    </div>
                                    <a
                                        className="wf-resource-button"
                                        href={
                                            workflow &&
                                            workflow.resourceDetails &&
                                            workflow.resourceDetails.documentUrl
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {workflow &&
                                            workflow.resourceDetails &&
                                            workflow.resourceDetails.buttonName}
                                        {workflow &&
                                        workflow.resourceDetails &&
                                        workflow.resourceDetails.buttonIcon ? (
                                            <div className="download-icon-wrap">
                                                <img
                                                    alt=""
                                                    src={
                                                        workflow.resourceDetails
                                                            .buttonIcon
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div className="download-icon-wrap">
                                                <svg
                                                    width="36"
                                                    height="36"
                                                    viewBox="0 0 36 36"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M18 0C8.0589 0 0 8.0589 0 18C0 27.9411 8.0589 36 18 36C27.9411 36 36 27.9411 36 18C36 8.0589 27.9411 0 18 0ZM18 32.0869C10.2189 32.0869 3.91305 25.7791 3.91305 18C3.91305 10.2209 10.2189 3.91305 18 3.91305C25.7811 3.91305 32.0869 10.2209 32.0869 18C32.0869 25.7791 25.7811 32.0869 18 32.0869ZM21.5218 10.4674H14.4782V18.4696H10.0761L18 25.9239L25.9239 18.4696H21.5217L21.5218 10.4674Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </a>
                                </div>
                            )}

                            {/* ------------------------rewards section start-------------------- */}
                            {workflow &&
                                workflow.rewardsDetails &&
                                workflow.totalRewardPoints > 0 && (
                                    <RewardsDetails {...workflow} />
                                )}
                            {/* ------------------------rewards section end-------------------- */}

                            <div className="wf-milestone-card-container">
                                <div className="wf-milestone-header">
                                    {workflow && workflow.milestoneHeader}
                                </div>
                                {workflow && workflow.milestones && (
                                    <MileStoneBlock
                                        milestones={workflow.milestones}
                                        setCurrentMileStoneId={(id) => {
                                            setCurrentMileStoneId(id);
                                            scrollDown(milestoneScrollRef);
                                        }}
                                        mileStoneIdToStart={milestoneIdToStart}
                                        currentMileStoneId={currentMileStoneId}
                                    />
                                )}
                            </div>
                        </Container>
                    </section>
                    {workflow &&
                        workflow.milestones &&
                        currentMileStone &&
                        currentMileStone._id && (
                            <section
                                className="wf-milestone-details-section"
                                ref={milestoneScrollRef}
                            >
                                <div className="footer-svg-wrap wf-cyber-security-none">
                                    <svg
                                        width="596"
                                        height="451"
                                        viewBox="0 0 596 451"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 408L516 404.5L446 450.5L0 408Z"
                                            fill="#0773BB"
                                        />
                                        <path
                                            d="M466 405H515.5L651 0L466 405Z"
                                            fill="#17B68D"
                                        />
                                    </svg>
                                </div>
                                {workflow &&
                                    workflow.milestones &&
                                    currentMileStoneId && (
                                        <>
                                            <Container className="wf-milestone-details-container">
                                                <div className="wf-milestone-details-card">
                                                    <div className="wf-milestone-details-heading-wrap">
                                                        <label className="wf-milestone-details-heading">
                                                            {currentMileStone &&
                                                                currentMileStone.name}
                                                        </label>
                                                        <MileStoneButtonGroup
                                                            milestones={
                                                                workflow.milestones
                                                            }
                                                            setCurrentMileStoneId={
                                                                setCurrentMileStoneId
                                                            }
                                                            currentMileStone={
                                                                currentMileStone
                                                            }
                                                        />
                                                    </div>
                                                    <label className="wf-milestone-inner-heading">
                                                        {currentMileStone.shortDescription.toUpperCase()}
                                                    </label>
                                                    <div className="wf-milestone-inner-content-wrap">
                                                        <div className="wf-milestone-inner-content">
                                                            {currentMileStoneId ===
                                                                currentMileStone._id && (
                                                                <img
                                                                    key={
                                                                        currentMileStoneId
                                                                    }
                                                                    alt=""
                                                                    src={
                                                                        currentMileStone.displayImage
                                                                    }
                                                                    className="wf-milestone-inner-img"
                                                                />
                                                            )}

                                                            <div>
                                                                {currentMileStone &&
                                                                    currentMileStone.descriptionHtml &&
                                                                    HtmlReactParser(
                                                                        currentMileStone.descriptionHtml,
                                                                    )}
                                                            </div>
                                                        </div>
                                                        <Milestone
                                                            mileStone={
                                                                currentMileStone
                                                            }
                                                            isDependentMilestoneComplete={isDependentMilestoneComplete(
                                                                currentMileStone,
                                                                workflow,
                                                            )}
                                                            isLastMilestone={isLastWMilestone(
                                                                currentMileStone,
                                                                workflow,
                                                            )}
                                                            navigateToCTALink={
                                                                navigateToCTALink
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </Container>
                                            <div className="footer-svg-wrap wf-cyber-security-none">
                                                <svg
                                                    width="596"
                                                    height="451"
                                                    viewBox="0 0 596 451"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M0 408L516 404.5L446 450.5L0 408Z"
                                                        fill="#0773BB"
                                                    />
                                                    <path
                                                        d="M466 405H515.5L651 0L466 405Z"
                                                        fill="#17B68D"
                                                    />
                                                </svg>
                                            </div>
                                        </>
                                    )}
                            </section>
                        )}
                    {workflow &&
                        workflow.displayElements &&
                        workflow.displayElements.footer && (
                            <>
                                {HtmlReactParser(
                                    workflow.displayElements.footer,
                                )}
                                {/*  TODO - Ingram Cloud Cyber Security Footer  */}
                                {/* <footer className="workflow-footer ingram-cloud-cyber-footer">
                                    <div className="workflow-footer-inner">
                                        <div className="footer-left-right-wrap">
                                            <div className="footer_left">
                                                <div className="footer-title">
                                                    Ingram Micro Cloud
                                                    Cybersecurity
                                                </div>
                                                <div className="footer-subtitle">
                                                    Build your cybersecurity
                                                    practice with a proven,
                                                    framework based approach.
                                                </div>
                                            </div>
                                            <div className="footer_right">
                                                <div className="footer-list footer-list-left">
                                                    <div className="footer-list-title">
                                                        Go-to-MarketHub
                                                    </div>
                                                    <ul>
                                                        <li>
                                                            <a href="/sw/app/Marketing/CPage.aspx?pageContext=CYBERSECURITYOVERVIEW">
                                                                Cybersecurity
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/sw/app/Marketing/CPage.aspx?pageContext=WEBINARS">
                                                                Webinar &amp;
                                                                Events
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/sw/app/Marketing/CPage.aspx?pageContext=SOLUTION_MARKETING_CAMPAIGNS">
                                                                Solutions
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/sw/swchannel/MarketingCenter/intranet/Campaigns.cfm">
                                                                My Marketing
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="footer-list footer-list-right">
                                                    <div className="footer-list-title">
                                                        Legal
                                                    </div>
                                                    <ul>
                                                        <li>
                                                            <a
                                                                href="https://corp.ingrammicro.com/en-us/legal/privacy"
                                                                target="blank"
                                                            >
                                                                Privacy
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="https://corp.ingrammicro.com/en-us/legal/terms_of_use"
                                                                target="blank"
                                                            >
                                                                Terms of Use
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="footer_bottom_copyright-wrap">
                                            <div className="footer_left">
                                                <img
                                                    className="footer-ingram-cloud-logo"
                                                    alt=""
                                                    src="https://www.swcontentsyndication.com/sw/swchannel/images/users/215454/home_images/footer_logo.png"
                                                />
                                            </div>
                                            <div className="footer_right">
                                                <span className="copyright-text">
                                                    © 2022 - All Rights
                                                    Reserved. Ingram Micro Inc.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </footer> */}
                            </>
                        )}
                </div>
            )}
        </>
    );
};

export default WorkFlow;
