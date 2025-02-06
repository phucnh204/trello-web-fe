import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
// 
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddLinkIcon from "@mui/icons-material/AddLink";
function BoardContent() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        height: "calc(100vh - 55px - 65px)",
        p: "10px 0",
      }}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {/* column 01*/}
        <Box
          sx={{
            minWidth: "300px",
            maxWidth: "300px",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
            ml: 2,
            mt: 1,
            borderRadius: "6px",
            height: "fit-content",
            maxHeight: "80vh",
            overflowY: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar-track": {
              marginY: "55px",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              // display: "none",
              position: "relative",
              right: 0,
            },
          }}
        >
          {/* Card hearder */}
          <Box
            sx={{
              height: "55px",
              // width: "calc(100% + 1px)",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "white",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#333643" : "#000",
              position: "sticky",
              top: 0,

              backgroundColor: "white",
              zIndex: 1,
              // padding: "10px 0",
              // fontWeight: "bold",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Column title
            </Typography>
            <Box sx={{}}>
              <Tooltip title="More options">
                <Button
                  id="basic-column-dropdown"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={<ExpandMoreIcon />}
                />
              </Tooltip>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-column-dropdown",
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                {/*  */}
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                {/*  */}
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                {/*  */}
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                {/*  */}
                <Divider />
                {/*  */}
                <MenuItem>
                  <ListItemIcon>
                    <DeleteOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                {/*  */}
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Card content */}
          <Box
            sx={{
              mt: 1,
              px: "15px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {/* Card 1 */}
            <Card
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
            </Card>
            {/* Card 2 */}
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            {/* Card 3 */}
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            {/* Card 4 */}
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            {/* Card 5 */}
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            {/* Card 6 */}
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            {/* Card 7 */}
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            {/* Card 8 */}
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Card footer */}
          <Box
            sx={{
              height: "65px",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: "pointer" }} />
            </Tooltip>
          </Box>
        </Box>
        {/* column 02*/}
        <Box
          sx={{
            minWidth: "300px",
            maxWidth: "300px",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
            ml: 2,
            mt: 1,
            borderRadius: "6px",
            height: "fit-content",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {/* Card hearder */}
          <Box
            sx={{
              height: "55px",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Column title
            </Typography>
            <Box sx={{ ml: 5 }}>
              <Tooltip title="More options">
                <Button
                  id="basic-column-dropdown"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={<ExpandMoreIcon />}
                />
              </Tooltip>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-column-dropdown",
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                {/*  */}
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                {/*  */}
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                {/*  */}
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                {/*  */}
                <Divider />
                {/*  */}
                <MenuItem>
                  <ListItemIcon>
                    <DeleteOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                {/*  */}
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Card content */}
          <Box
            sx={{
              px: "15px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {/* Card 1 */}
            <Card
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
            </Card>
            {/* Card 2 */}
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            {/* Card 3 */}
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
            {/* Card 4 */}
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  "&:last-child": {
                    p: 1.5,
                  },
                }}
              >
                <Typography>Card 02</Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Card footer */}
          <Box
            sx={{
              height: "65px",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: "pointer" }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BoardContent;
