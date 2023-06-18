import * as React from 'react';

interface Data {
    milestones: Array<any>;
    setCurrentMileStoneId: (m) => void;
    currentMileStone: any;
}

const MileStoneButtonGroup: React.FC<Data> = ({
    milestones,
    setCurrentMileStoneId,
    currentMileStone,
}) => {
    return (
        <div className="wf-milestone-details-list-wrap">
            <ul className="wf-milestone-details-list">
                {milestones &&
                    milestones.length &&
                    milestones.map((milestone) => {
                        const clsName =
                            milestone._id === currentMileStone._id
                                ? 'wf-milestone-details-tab active'
                                : 'wf-milestone-details-tab';
                        return (
                            <li
                                className={clsName}
                                key={milestone._id}
                                onClick={() => {
                                    setCurrentMileStoneId(milestone._id);
                                }}
                            >
                                {milestone.name}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default MileStoneButtonGroup;
