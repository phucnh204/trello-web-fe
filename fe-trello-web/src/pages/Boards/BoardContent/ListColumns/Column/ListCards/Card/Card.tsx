import { Button, Typography } from "@mui/material";
import { Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddLinkIcon from "@mui/icons-material/AddLink";

interface CardProps {
  _id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string | null;
  cover: string | null;
  memberIds: string[];
  comments: string[];
  attachments: string[];
}

interface CardComponentProps {
  card: CardProps; 
}

const Card: React.FC<CardComponentProps> = ({ card }) => {
  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
      }}
    >
      {card?.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
          title={card.title} // Hiển thị tên card cho title
        />
      )}

      <CardContent
        sx={{
          p: 1.5,
          "&:last-child": { p: 1.5 },
        }}
      >
        <Typography>{card?.title}</Typography>
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
