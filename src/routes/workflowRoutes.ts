import Workflow from '../components/Workflow/component/Workflow';

const workflowRoutes = [
    {
        path: '/:locale?/sw/workflow/:id',
        component: Workflow,
        exact: true,
    },
];

export default workflowRoutes;
