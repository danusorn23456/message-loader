import { useEffect, useRef, useState } from "react";

function App() {

  //state from api
  const [chats, setChats] = useState([]);

  //animation loader state
  const scrollBar = useRef(null);
  const [page, setPage] = useState(1)
  const [perpage,] = useState(8);

  const onScrollHandler = () => {
    let scrollOffsetHeight = scrollBar.current.offsetHeight;
    let scrollHeight = scrollBar.current.scrollHeight;
    let scrollTop = scrollBar.current.scrollTop;

    if (scrollTop - 10 < scrollOffsetHeight - scrollHeight) {
      setPage(prev => prev += 1)
    }
  }

  const arrayReverseObj = obj => (Object.keys(obj).reverse().map(key => ({ ...obj[key], key: key })));

  useEffect(() => {
    // replace with api in realworld project
    const mockMessage = Array.from({ length: 4 }).map(i => ({
      userId: Math.random(1, 3),
      message: [{
        text: 'Before Last Lorem ipsum dolor sit amet'
      },
      {
        text: 'Last Lorem ipsum dolor sit ametLast Lorem ipsum dolor sit ametLast Lorem ipsum dolor sit ametLast Lorem ipsum dolor sit amet'
      }
      ]
    }))
    setChats(prev => [
      ...prev,
      ...mockMessage
    ])
  }, [page]);

  //for classname creator
  let isMe = (index) => (index % 2 == 0);
  let isBottom = (index) => (index === 0);

  return (
    <>
      <div className="flex justify-center h-screen bg-blue-400 overflow-hidde p-16">
        <div className="bg-white w-2/3 shadow-xl flex flex-col rounded-2xl overflow-hidden">
          <header className="h-16 bg-white border-b border-gray-200"></header>
          <div
            ref={scrollBar}
            onScroll={() => onScrollHandler()}
            className={[
              "relative flex-shrink-1 flex h-full overflow-y-scroll flex-col-reverse p-2",
            ].join(" ")}
          >
            {chats.map((each, eachIndex) => arrayReverseObj(each.message).map((chat, chatIndex) => (
              <div
                className={[
                  "mx-2 flex items-start my-4",
                  isMe(eachIndex) ? "flex-row-reverse pl-2" : "pr-2",
                ].join(" ")}
              >
                {isBottom(chatIndex) && (
                  <div className="w-8 h-8 flex-shrink-0 mx-2 bg-gray-300 rounded-full"></div>
                )}
                <div>
                  <p
                    key={eachIndex + chatIndex}
                    className={[
                      "inline-block px-4 py-2 rounded-md",
                      isMe(eachIndex)
                        ? "bg-blue-500 rounded-br-none text-white"
                        : "bg-gray-100 rounded-bl-none text-gray-900",
                      isMe(eachIndex)
                        ? !isBottom(chatIndex) && "mr-12"
                        : !isBottom(chatIndex) && "ml-12",
                    ].join(" ")}
                  >
                    {chat.text}
                  </p>
                  {
                    isBottom(chatIndex) && (
                      <p className="text-sm text-gray-300">00:00</p>
                    )
                  }
                </div>
              </div>
            ))
            )}
          </div>
          <footer className="h-16 bg-white border-t border-gray-200"></footer>
        </div>
      </div>
    </>
  );
}

export default App;
