using ChessChallenge.API;

public class MyBot : IChessBot
{
    public Move Think(Board board, Timer timer)
    {
        Move[] movesa = board.GetLegalMoves();
        Move[] movesb = board.GetLegalMoves(true);
        System.Diagnostics.Debug.WriteLine(movesb[0]);
       // Move Do = movesb[0] == null? movesa[0] : movesb[0];

        return movesa[0];
    }
}