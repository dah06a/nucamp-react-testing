import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Link } from 'react-router-dom';

const required = val => val && val.length;
const minLength = len => val => val && (val.length >= len);
const maxLength = len => val => !val || (val.length <= len);

class CommentForm extends Component {

    state = {
        isModalOpen: false
    }

    toggleModal = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit = (values) => {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {

        const commentModal = (
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <Label htmlFor="rating" md={2}>Rating</Label>
                            <Control.select
                                model=".rating"
                                id="rating"
                                name="rating"
                                className="form-control"
                                validators={{required}}
                            >
                                <option></option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            <Errors
                                className="text-danger"
                                model=".rating"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required',
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <Label htmlFor="author" md={2}>Name</Label>
                            <Control.text
                                model=".author"
                                id="author"
                                name="author"
                                className="form-control"
                                placeholder="Your Name"
                                validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 15 characters or less.'
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <Label htmlFor="text" md={2}>Comment</Label>
                            <Control.textarea
                                model=".text"
                                id="text"
                                name="text"
                                rows="6"
                                className="form-control"
                                placeholder="Type your comment here."
                                validators={{
                                    required,
                                    maxLength: maxLength(100)
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".text"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required',
                                    maxLength: 'Only 100 characters allowed.'
                                }}
                            />
                        </div>

                        <Button type="submit" color="primary">Submit Comment</Button>

                    </LocalForm>
                </ModalBody>
            </Modal>
        );

        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>
                {commentModal}
            </React.Fragment>
        );
    }
}

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments, addComment, campsiteId}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map((comment) => {
                    const commentDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)));
                    return (
                        <div key={comment.id}>
                            <p>{comment.text}</p>
                            <p>Author: {comment.author}, Date: {commentDate}</p>
                        </div>
                    );
                })}
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </div>
        );
    }
    return <div />
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    } return <div />
}

export default CampsiteInfo;
