import * as React from 'react';
const RewardsDetails: any = (workflow) => {
    return (
        <>
            <div className="wf-rewards-section">
                <div className="wf-rewards-button-area">
                    {workflow.rewardsDetails.buttonText && (
                        <span className="wf-rewards-button">
                            {workflow.rewardsDetails.buttonText}
                        </span>
                    )}
                    {workflow.rewardsDetails.buttonIcon && (
                        <span className="wf-rewards-button-icon">
                            <img
                                src={workflow.rewardsDetails.buttonIcon}
                                alt=""
                            ></img>
                        </span>
                    )}
                </div>

                {workflow.rewardsDetails.totalRewardPointsText && (
                    <div className="wf-rewards-points-area">
                        {workflow.rewardsDetails.totalRewardPointsText?.replace(
                            '$$totalRewardPoints',
                            workflow.totalRewardPoints,
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default RewardsDetails;
