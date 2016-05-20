import { Route, IndexRoute, IndexRedirect } from 'react-router';
import React from 'react';
import OrganisationPipelines from './OrganisationPipelines';
import OrganisationPipelines2 from './OrganisationPipelines2';
import {
    Pipelines,
    Pipelines2,
    MultiBranch,
    Activity,
    PullRequests,
    PipelinePage,
    RunDetails,
    RunDetailsPipeline,
    RunDetailsChanges,
    RunDetailsArtifacts,
    RunDetailsTests,
} from './components';

// Config has some globals in it for path / routes
import { rootRoutePath } from './config';

export default (
    <Route path={rootRoutePath}>
        <Route component={OrganisationPipelines}>
            <IndexRoute component={Pipelines} />
            <Route component={PipelinePage}>
                <Route path=":pipeline/branches" component={MultiBranch} />
                <Route path=":pipeline/activity" component={Activity} />
                <Route path=":pipeline/pr" component={PullRequests} />
            </Route>
            <Route path=":pipeline/detail/:branch/:runId" component={RunDetails}>
                <IndexRedirect to="pipeline" />
                <Route path="pipeline" component={RunDetailsPipeline} />
                <Route path="changes" component={RunDetailsChanges} />
                <Route path="tests" component={RunDetailsTests} />
                <Route path="artifacts" component={RunDetailsArtifacts} />
            </Route>
        </Route>
        <Route component={OrganisationPipelines2}>
            <Route path="test" component={Pipelines2} />
        </Route>
    </Route>
);
