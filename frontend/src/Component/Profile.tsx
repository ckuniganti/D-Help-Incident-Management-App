import { useContext } from "react";
import UserContext from "../Context/UserContext";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Profile = () => {
  const userCnxt = useContext(UserContext);
  const imageUrl: string =
    "/static/images/cards/" + userCnxt.firstName + ".jpg";
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
            {userCnxt.firstName} {userCnxt.lastName}
          </Typography>
          <Typography variant="subtitle1">
            <BadgeIcon fontSize="small" />
            {userCnxt.title}
          </Typography>
          <Typography variant="subtitle2">
            <AttachMoneyIcon fontSize="small" />
            {userCnxt.costCenter}
          </Typography>
          <Typography variant="body2">
            <LocationOnIcon fontSize="small" />
            {userCnxt.location}
          </Typography>
          <Typography variant="body2">
            <PhoneIcon fontSize="small" />
            {userCnxt.contactNumber}
          </Typography>
          <Typography variant="body2">
            <EmailIcon fontSize="small" />
            {userCnxt.contactEmail}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
