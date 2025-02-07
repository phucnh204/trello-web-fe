import { Box, Button } from "@mui/material";
import Column from "./Column/Column";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ColumnsProps } from "./type";

const ListColumns: React.FC<ColumnsProps> = ({ columns }) => {
  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
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
        {columns?.map((column) => {
          return <Column key={column._id} column={column} />;
        })}

        {/* Box add new column */}
        <Box
          sx={{
            minWidth: "200px",
            maxWidth: "200px",
            mx: 2,
            borderRadius: "6px",
            height: "fit-content",
            bgcolor: "#ffffff3d",
            mt: 1.5,
          }}
        >
          <Button
            sx={{
              color: "white",
              width: "100%",
              py: 1,
            }}
            startIcon={<AddToDriveIcon />}
          >
            Add new column 1
          </Button>
        </Box>
      </Box>
    </SortableContext>
  );
};

export default ListColumns;
