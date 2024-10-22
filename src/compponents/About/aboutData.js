import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export const aboutData = {
  displayImageOne:
    "https://cdn.pixabay.com/photo/2023/11/07/06/52/forest-8371211_1280.jpg",
  displayImageTwo:
    "https://cdn.pixabay.com/photo/2021/05/29/03/00/beach-6292382_1280.jpg",
  aboutUs: {
    image:
      "https://cdn.pixabay.com/photo/2021/03/01/18/57/mountains-6060586_1280.jpg",
    header: "Dive into the wild world of travel blogs !",
    description:
      "Embark on a journey of exploration where the world’s hidden treasures await you. Share your adventures with others—whether it's a breathtaking sunset from a cliffside viewpoint or a delicious meal enjoyed at a family-run eatery. Discover hidden gems, share your adventures, and inspire wanderlust in others !",
  },
  chooseUsArray: [
    {
      image:
        "https://cdn.pixabay.com/photo/2023/01/08/05/52/sunset-7704594_1280.jpg",
      label: "Ensless Inspiration",
      description:
        "Get lost in a sea of travel stories that ignite your wanderlust !",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2021/07/08/03/55/mount-everest-6395759_1280.jpg",
      label: "Post your Journey",
      description:
        "Share your own travel tales and inspire others to pack their bags !",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2019/02/09/19/37/seaside-3985826_1280.jpg",
      label: "Explore the World",
      description:
        "Find blogs about places you've never header of, but definitely need to visit.",
    },
  ],
  contactDetails: [
    {
      label: "Location",
      value: "Kolkata, India",
      icon: <LocationOnIcon color="warning" />,
    },
    {
      label: "Call",
      value: "1234567890",
      icon: <CallIcon color="warning" />,
    },
    {
      label: "Email",
      value: "dummy.mail@gmail.com",
      icon: <EmailIcon color="warning" />,
    },
  ],
};
