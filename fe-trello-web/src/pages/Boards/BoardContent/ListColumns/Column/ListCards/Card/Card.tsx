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
  const shouldShowCardActiopns = () => {
    return (
      !!card?.memberIds.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    );
  };

  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}

      <CardContent
        sx={{
          p: 1.5,
          "&:last-child": { p: 1.5 },
        }}
      >
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardActiopns() && (
        <CardActions
          sx={{
            p: "0 4px 8px 4px",
          }}
        >
          {!!card?.memberIds.length && (
            <Button size="small" startIcon={<GroupOutlinedIcon />}>
              {card?.memberIds.length}
            </Button>
          )}

          {!!card?.comments.length && (
            <Button size="small" startIcon={<ReviewsIcon />}>
              {card?.comments.length}
            </Button>
          )}

          {!!card?.attachments.length && (
            <Button size="small" startIcon={<AddLinkIcon />}>
              {card?.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
};

export default Card;
