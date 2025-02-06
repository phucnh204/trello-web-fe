import { Button, Typography } from "@mui/material";
import { Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { CardProps } from "./type";

const Card: React.FC<CardProps> = ({ temporaryHideMedia }) => {
  if (temporaryHideMedia == true) {
    return (
      <MuiCard
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": { p: 1.5 },
          }}
        >
          <Typography>Phúc FE Dev</Typography>
        </CardContent>
      </MuiCard>
    );
  }
  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5YZiHtrkpcH-6E3hcObFWVIbfURzmp9XpSw&s"
        title="green iguana"
      />
      <CardContent
        sx={{
          p: 1.5,
          "&:last-child": { p: 1.5 },
        }}
      >
        <Typography>Phúc FE Dev</Typography>
      </CardContent>
      <CardActions
        sx={{
          p: "0 4px 8px 4px",
        }}
      >
        <Button size="small" startIcon={<GroupOutlinedIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<ReviewsIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<AddLinkIcon />}>
          20
        </Button>
      </CardActions>
    </MuiCard>
  );
};

export default Card;
