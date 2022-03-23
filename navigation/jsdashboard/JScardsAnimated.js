import React, { useContext, useRef } from "react";
import RetirementCards from "./JSRetirementCard";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  SafeAreaView,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { myColorsLight } from "../../constant/colors";
import CardsContext from "../../contexts/cardsContext";
import JSBudgetCards from "./JsBudgetCard";
import JsTimelineCard from "./JsTimelineCard ";
import JsLifeExpectCard from "./JsLifeExpectancy";
import JsProfileCard from "./JsProfileCard";
import JsCurrentCard from "./JsCurrentCard";
import JsCarrierCard from "./JsCarrierCard";
const cardHeight = 430;
const cardTitle = 50;
const cardPadding = 30;
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const { height } = Dimensions.get("window");
const cards = [
  {
    name: "Retirement Lifestyle",
    color: myColorsLight.grey8,
  },
  {
    name: "Budget Benchmark",
    color: myColorsLight.grey7,
  },
  {
    name: "Timeline",
    color: myColorsLight.grey6,
  },
  {
    name: "Life Expectancy",
    color: myColorsLight.grey5,
  },
  {
    name: "Profile",
    color: myColorsLight.grey4,
  },
  {
    name: "Current Lifestyle",
    color: myColorsLight.grey3,
  },
  {
    name: "Career Path",
    color: myColorsLight.grey2,
  },
];

export default function JSCardsAnimated() {
  const [y] = React.useState(new Animated.Value(0));
  const [selectedCards, setSelectedCards] = React.useState(null);
  const [choosenCard, setChoosenCard] = React.useState(null);
  const outcomePopper = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;
  const selectedPopper = new Animated.ValueXY({
    x: 0,
    y: 0,
  });

  const pan = PanResponder.create({
    //this set the position to the supplied x/y position
    onPanResponderRelease: (evt, gestureState) => {
      //  y.setValue(100)
      // outcomePopper.setValue({ x: 0, y: 0 });
      // Animated.spring(outcomePopper, {
      //   toValue: { x: 0, y: 0 },
      //   useNativeDriver: true,
      //   bounciness: 10,
      // }).start();
    },
    onMoveShouldSetPanResponder: () => true,
    //this moves your animated view with response to pan dy dx value
    // onPanResponderMove: Animated.event(
    //   [null, { dx: position.x, dy: position.y }],
    //   { useNativeDriver: false }
    // ),
    onPanResponderMove: (e, gestureState) => {
      // console.log(parse(outcomePopper.y) <99);
      // if ( outcomePopper.y < deviceHeight / 2 - 100 ) {
      //   outcomePopper.setValue({ x: gesture.dx, y: gesture.dy });
      // }
      const MaxDistance = deviceHeight / 2 - 100;
      const MinDistance = 0;
      const dxCapped = Math.min(
        Math.max(parseInt(gestureState.dy), MinDistance),
        MaxDistance
      );
      if (gestureState.dy < MaxDistance && gestureState.dy > MinDistance) {
        // values.dx = gestureState.dx
        // values.dy = gestureState.dy
        outcomePopper.setValue({ x: gestureState.dx, y: gestureState.dy });
        // Animated.spring(outcomePopper, {
        //   toValue: { x: gestureState.dx, y: gestureState.dy },
        //   useNativeDriver: true,
        //   bounciness: 10,

        // }).start();
      } else {
        // values.dx = dxCapped
        // values.dy = gestureState.dy
        // outcomePopper.setValue({ x: gestureState.dy, y: dxCapped });
        Animated.spring(outcomePopper, {
          toValue: { x: gestureState.dy, y: dxCapped },
          useNativeDriver: true,
          bounciness: 2,
        }).start();
      }
    },
    // (e, c) => {
    //   // console.log("move", e);
    //   Animated.event([null, { dx: position.x, dy: position.y }]);
    // },
  });
  const handleshowCards = () => {
    setSelectedCards(null);
  };
  const hanleSelected = (index) => {
    // console.log("hello");

    Animated.sequence([
      Animated.timing(outcomePopper, {
        toValue: { x: 0, y: deviceHeight / 2 - 40 },
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }),
      // Animated.spring(selectedPopper, {
      //   toValue: { x: 0, y: -deviceHeight / 2  },
      //   useNativeDriver: true,
      //   bounciness: 0,
      // }),
      // Animated.timing(selectedPopper, {
      //   toValue: { x: 0, y: -deviceHeight / 3 - 100 },
      //   duration: 500,
      //   delay: 300,
      //   useNativeDriver: true,
      // }),
    ]).start(() => {
      setSelectedCards(index);
    });
  };
  React.useEffect(() => {
    Animated.spring(outcomePopper, {
      toValue: { x: 0, y: deviceHeight / 2 - 120 },
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  }, [selectedCards]);
  return (
    <CardsContext.Provider value={{}}>
      {selectedCards === null && (
        <Animated.View
          {...pan.panHandlers}
          style={{
            ...styles.root,
            transform: [{ translateY: outcomePopper.y }],
          }}
        >
          <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
              {cards.map((card, i) => {
                const inputRange = [-cardHeight, 0];
                const outputRange = [
                  cardHeight * i,
                  (cardHeight - cardTitle) * -i,
                ];
                if (i > 0) {
                  inputRange.push(cardPadding * i);
                  outputRange.push((cardHeight - cardPadding) * -i);
                }
                // const translateY = y.interpolate({
                //   inputRange,
                //   outputRange,
                //   extrapolateRight: "clamp",
                // });
                const translateY = outcomePopper.y.interpolate({
                  inputRange,
                  outputRange,
                  extrapolateRight: "clamp",
                });
                return (
                  <Animated.View
                    key={card.name}
                    style={{
                      transform: [
                        {
                          translateY:
                            i === selectedCards ? selectedPopper.y : translateY,
                        },
                      ],
                    }}
                  >
                    <View
                      style={{ ...styles.card, backgroundColor: card.color }}
                    >
                      <TouchableOpacity onPress={hanleSelected.bind(this, i)}>
                        <Text style={styles.cardName}>{card.name}</Text>
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                );
              })}
            </View>
            {/* <Animated.ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y }
                  }
                }
              ],
              { useNativeDriver: true }
            )}
          /> */}
          </View>
        </Animated.View>
      )}
      {selectedCards === 0 && <RetirementCards {...{ handleshowCards }} />}
      {selectedCards === 1 && <JSBudgetCards {...{ handleshowCards }} />}
      {selectedCards === 2 && <JsTimelineCard {...{ handleshowCards }} />}
      {selectedCards === 3 && <JsLifeExpectCard {...{ handleshowCards }} />}
      {selectedCards === 4 && <JsProfileCard {...{ handleshowCards }} />}
      {selectedCards === 5 && <JsCurrentCard {...{ handleshowCards }} />}
      {selectedCards === 6 && <JsCarrierCard {...{ handleshowCards }} />}
    </CardsContext.Provider>
  );
}
// }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 7,
    elevation: 7,
    height: Dimensions.get("screen").width / 1.1,
  },
  container: {
    flex: 1,
  },
  selectedPoper: {
    height: Dimensions.get("screen").width / 1.1,
    position: "absolute",
    zIndex: 9,
    elevation: 9,
  },
  content: {
    height: height * 2,
  },
  card: {
    height: cardHeight,
    borderRadius: 10,
    padding: 10,

    paddingLeft: 20,
  },
  cardName: {
    fontSize: 18,
  },
});
