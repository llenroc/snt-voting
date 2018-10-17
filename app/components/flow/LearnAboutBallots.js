import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class LearnAboutBallots extends Component {
  state = {
    open: false,
    dialogTitle: '',
    dialogText: ''
  };

  handleClickOpen = (dialogTitle, dialogText) => {
    this.setState({
      open: true,
      dialogTitle,
      dialogText
    });
  };

  handleClose = value => {
    this.setState({ open: false });
  };

  render(){
    const {polls} = this.props;

    let title, ballots = [];
    if(polls && polls.length){
      title = polls[0].content.title;
      ballots = polls[0].content.ballots;
    }

    return (
    <div className="section">
        <Typography variant="headline">{title}</Typography>
        <BallotDialog
          title={this.state.dialogTitle}
          text={this.state.dialogText}
          open={this.state.open}
          onClose={this.handleClose}
        />
        {
          ballots.map((item, i) => {
            return <Card key={i} className="card">
              <CardContent>
                  <Typography gutterBottom component="h2">{item.title}</Typography>
                  <Typography component="p">{item.subtitle}</Typography>
              </CardContent>
              <CardActions>
                  <Button size="small" color="primary" onClick={() => this.handleClickOpen(item.title, item.content)}>Learn more &gt;</Button>
              </CardActions>
            </Card>
          })
        }
        <Link to="/votingHelp"> <Button>How voting works</Button></Link>
    </div>
    );
  }
}

class BallotDialog extends Component {

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  
  handleListItemClick = value => {
    this.props.onClose(value);
  };
  
  render() {
    const { onClose, title, text, polls, ...other } = this.props;
   
    return (
    <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" component="div">{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="primary" autoFocus>Ok</Button>
      </DialogActions>
    </Dialog>
    );
  }
}

export default LearnAboutBallots;