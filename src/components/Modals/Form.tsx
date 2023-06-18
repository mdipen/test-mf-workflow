import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    example: string;
    exampleRequired: string;
};

interface Data {
    show?: boolean;
    onHide?: () => void;
}

const Form: React.FC<Data> = ({ show, onHide }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <Modal
            show={show}
            onHide={onHide}
            dialogClassName="workflow-modal-dialog-wrap"
            contentClassName="workflow-modal-content-wrap"
            // size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="workflow-modal-header-wrap">
                <Modal.Title id="contained-modal-title-vcenter">
                    Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="modal-des text-center mb-16">
                    Name an HPE Champion within your organization. As the
                    Champion, this contact acts as the primary point of contact
                    for Ingram and HPE to coordinate HPE growth within your
                    organization.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <input defaultValue="test" {...register('example')} />

                    {/* include validation with required or other standard HTML validation rules */}
                    <input
                        {...register('exampleRequired', { required: true })}
                    />
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && (
                        <span>This field is required</span>
                    )}

                    <input type="submit" />
                </form>
            </Modal.Body>
        </Modal>
    );
};
export default Form;
