import React, { Component, PropTypes } from 'react';
import { EmptyStateView, fetch } from '@jenkins-cd/design-language';
import Table from './Table';
import PullRequest from './PullRequest';
import { RunsRecord } from './records';

const { object, array } = PropTypes;

export class PullRequests extends Component {

    renderEmptyState(repoName) {
        return (
            <main>
                <EmptyStateView iconName="goat">
                    <h1>Push me, pull you</h1>

                    <p>
                        When a Pull Request is opened on the repository <em>{repoName}</em>,
                        Jenkins will test it and report the status of
                        your changes back to the pull request on Github.
                    </p>

                    <button>Enable</button>
                </EmptyStateView>
            </main>
        );
    }

    render() {
        const { pipeline, data } = this.props;

        // render empty view while data loads
        if (!pipeline || !data) {
            return null;
        }

        const pullRequests = data.filter((run) => run.pullRequest);

        if (!pullRequests.length) {
            return this.renderEmptyState(pipeline.name);
        }

        const headers = [
            'Status',
            { label: 'Latest Build', className: 'build' },
            { label: 'Summary', className: 'summary' },
            'Author',
            { label: 'Completed', className: 'completed' },
        ];

        return (
            <main>
                <article>
                    <Table className="pr-table" headers={headers}>
                        { pullRequests.map((run, index) => {
                            const result = new RunsRecord(run);
                            return (<PullRequest
                              key={index}
                              pr={result}
                            />);
                        })}
                    </Table>
                </article>
            </main>
        );
    }
}

PullRequests.propTypes = {
    pipeline: object,
    data: array,
};

// Decorated for ajax as well as getting pipeline from context
export default fetch(PullRequests, (props, config) => {
    if (!props.pipeline) return null;
    return `${config.getAppURLBase()}/rest/organizations/jenkins` +
        `/pipelines/${props.pipeline.name}/branches`;
});
