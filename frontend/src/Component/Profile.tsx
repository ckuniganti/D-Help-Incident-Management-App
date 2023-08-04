import { useContext } from "react";
import UserContext from "../Context/UserContext";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import User from "../CommonInterfaces/User";

interface ProfileProps {
  user: User;
}
const Profile = ({ user }: ProfileProps) => {
  const imageUrl: string = "/static/images/cards/" + user.firstName + ".jpg";
  return (
    <>
      <Card sx={{ maxWidth: 350 }}>
        <CardMedia
          component="img"
          alt="Display Picture"
          height="350"
          image={imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="subtitle1">
            <BadgeIcon fontSize="small" />
            {user.title}
          </Typography>
          <Typography variant="subtitle2">
            <AttachMoneyIcon fontSize="small" />
            {user.costCenter}
          </Typography>
          <Typography variant="body2">
            <LocationOnIcon fontSize="small" />
            {user.location}
          </Typography>
          <Typography variant="body2">
            <PhoneIcon fontSize="small" />
            {user.contactNumber}
          </Typography>
          <Typography variant="body2">
            <EmailIcon fontSize="small" />
            {user.contactEmail}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
