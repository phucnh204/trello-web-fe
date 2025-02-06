import {  Container } from '@mui/material';
import AppBar from '../../components/AppBar';
import BoardBar from './BoardBar';
import BoardContent from './BoardContent';
import theme from "../../theme";

function Board() {
  return (
    <Container sx={{ height: "100vh" }} disableGutters maxWidth={false}>
      <AppBar/>
      
      <BoardBar/>

      <BoardContent/>
      
    </Container>
  );
}

export default Board;
