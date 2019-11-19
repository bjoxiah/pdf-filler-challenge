import React, {Component} from 'react';
import './DashboardPage.css';
import { toast } from "react-toastify";
import UserService from '../../services/UserService';
import { Row, Col, Table, Card, CardBody, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import ApplicantModal from '../../components/Applicant/Applicant';
import AuthService from '../../services/AuthService';
import Loader from 'react-loader-spinner';

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userid: '',
            applicantmodal: false,
            applicantList: [],
            downloader: false,
            downloadErrorMessage: ""
        }
    }

    async componentDidMount() {
        const {nameid, unique_name} = await UserService.getUserID();
        this.setState({                
            username: unique_name,
            userid: nameid
        });
        this.fetchApplicantList()
    }

    openApplicantModal = () => {
        this.setState({
            applicantmodal: !this.state.applicantmodal
        })
    }

    async fetchApplicantList() {
        const applicantList = await UserService.fetchApplicants();
        if (applicantList.status === 200) {
            this.setState({
                applicantList: applicantList.data
            });
        }
    }

    signout() {
        AuthService.signOut();
        this.props.history.push('/');
    }

    async downloadFile(id) {
        this.setState({
            downloader: !this.state.downloader
        });
        const file = await UserService.downLoadFile(id);
        if (file.status === 204) {
            this.setState({
                downloader: !this.state.downloader
            });
        } else {
            this.setState({
                downloader: !this.state.downloader,
            });
            toast.error("Your file could not be downloaded, something went wrong. I'll be fixing it soon.");
        }
    }
    
    render() {
        return (
            <div className="my-5 py-5">
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
                <Row>
                    <Col md="4" className="my-4">
                        <h5>Welcome, {this.state.username}</h5>
                        <p>Hello, we have a pdf form to fill from our entries in the database for this project. But we currently don't have any enty in the database so add info.</p>
                        <div className="py-3">
                            <Button color="secondary" onClick={this.openApplicantModal.bind(this)}>Add New Applicant</Button>{' '}
                            <Button color="secondary" onClick={this.signout.bind(this)}>Sign Out</Button>
                            <br/><br/>
                            {/* <Button color="link" className="text-warning"> <FontAwesomeIcon icon={faPlusCircle}/> Tester Account</Button> */}
                        </div>                        
                    </Col>
                    <Col>
                        <Card className="my-5">
                            <CardBody>
                                {
                                    (this.state.downloader)
                                    ?
                                        <div className="my-3 justify-content-center text-center">
                                            <Loader
                                                type="Oval"
                                                color="#ffc107"
                                                height={60}
                                                width={60}
                                                className="my-5 mx-auto"
                                            />
                                        </div>
                                    :                               
                                        <Table borderless>
                                            <thead>
                                                <tr>
                                                    <th>Applicant Name</th>
                                                    <th>Created By</th>
                                                    <th>Date Created</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                (this.state.applicantList.length > 0)
                                                ?
                                                    this.state.applicantList.map( (key, ix) => {
                                                        return (                                                                        
                                                            <tr key={key.applicantID}>
                                                                <td>{key.applicantName}</td>
                                                                <td>{key.createdBy}</td>
                                                                <td>{key.dateCreated}</td>
                                                                <td>
                                                                    <Button color="light" size="sm" onClick={this.downloadFile.bind(this, key.applicantID)}>
                                                                        <FontAwesomeIcon icon={faFileDownload}/>                                                       
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <tr>
                                                        <td colSpan="4" className="text-center mx-auto">No Applicant Record Yet</td>
                                                    </tr>
                                                }                                        
                                            </tbody>
                                        </Table>
                                }
                            </CardBody>
                        </Card>
                    </Col>                    
                </Row>
                { this.state.applicantmodal ? <ApplicantModal user_id={this.state.userid} title="Add New Applicant" handler={this.openApplicantModal} /> : ''}
            </div>
        );
    }
}

export default DashboardPage;
