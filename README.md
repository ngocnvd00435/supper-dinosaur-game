# puzzle-game-board

## Docs
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/
## Tools
https://www.codeandweb.com/texturepacker
## API server 
https://puzzle.techcombank.co.uk/swagger-ui.html
## Pusher
https://pusher.com/docs/channels/getting_started/javascript/
Client:
- KEY: 954f58177c4956eac317
- cluster : 'ap1'
channel game by gameId.
channel player by playerId
game message:
 - board: init new board
 - block: create new random block
 - status: change status
 - move: new move
 - all : new game

## Bước 1 Tạo game mới  
Call lên API tạo game mới lấy về các thông số như Player1, Player2 ,Board
https://puzzle.techcombank.co.uk/swagger-ui.html#/game-controller/startGameUsingGET

## Bước 2 Bắt đầu chơi
https://puzzle.techcombank.co.uk/swagger-ui.html#/game-controller/moveGameUsingPOST
- Nếu Player1 đi trước thì đợi Player1 move,
- Gọi lên API move
- Nhận về kết quả biểu diễn lên board , ví dụ Ăn hàng - Ăn cột, rơi Gem mới  , cộng điểm mana , trừ máu dối thủ 
- Nếu là Player2 đi thì nhận sự kiện và biểu diễn lên board .

## Bước 3 kết thúc game
 - Game kết thúc khi 1 trong 2 player có hitpoint=0 (game status =3)
