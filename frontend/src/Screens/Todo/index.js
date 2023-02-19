import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AddTodoCategory from "../../Modals/AddTodoCategory";
import AddTodo from "../../Modals/AddTodo";
import { useDispatch, useSelector } from "react-redux";
import {
  add_todo_category,
  add_todo_task,
  get_todo_data,
  remove_todo_task,
  update_todo_task,
} from "../../redux/actions/todoActions";
import { ActivityIndicator } from "react-native";

const { width, height } = Dimensions.get("window");

export function TodoCategoryCard({
  categoryTitle,
  numberOfTasks,
  color,
  numberOfCompletedTasks,
}) {
  return (
    <View style={styles.todoCategoryCard}>
      <Text
        style={{
          width: 180,
          height: 50,
          color: color,
          ...styles.numberOfTasksText,
        }}
      >
        {numberOfTasks} Tasks
      </Text>
      <Text style={styles.categoryTitle}>{categoryTitle}</Text>
      <View style={styles.progressBar}>
        <Animated.View
          style={
            ([StyleSheet.absoluteFill],
            {
              backgroundColor: color,
              width: `${(numberOfCompletedTasks / numberOfTasks) * 100}%`,
              height: "100%",
            })
          }
        />
      </View>
    </View>
  );
}

export const TodoTaskAccordion = ({ task_id, title, description, is_done }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

  const deleteTodoTask = async () => {
    await remove_todo_task(dispatch, {
      task_id: task_id,
    });
  };

  const updateTodoTask = async () => {
    await update_todo_task(dispatch, {
      task_id: task_id,
    });
    const getTodoData = async () => {
      await get_todo_data(dispatch, userData);
    };
    getTodoData();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleExpanded}
        style={styles.todoTaskCard}
        activeOpacity={0.92}
      >
        <Text
          style={{
            ...styles.taskText,
            textDecorationLine: is_done ? "line-through" : "none",
          }}
        >
          {title}
        </Text>
        <Animated.View>
          {expanded && (
            <View>
              {description && (
                <Text style={{ color: "#242424", marginVertical: 15 }}>
                  {description}
                </Text>
              )}
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <TouchableOpacity
                  style={{
                    ...styles.todoTaskButton,
                    backgroundColor: "#747dff",
                  }}
                  onPress={() => updateTodoTask()}
                  activeOpacity={0.92}
                >
                  {/* <Text style={styles.todoTaskButtonText}></Text> */}
                  {is_done ? (
                    <MaterialCommunityIcons
                      name="checkbox-marked-circle"
                      size={20}
                      color="#fff"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle-outline"
                      size={20}
                      color="#fff"
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.todoTaskButton,
                    backgroundColor: "#FF605C",
                  }}
                  onPress={() => deleteTodoTask()}
                  activeOpacity={0.92}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

// Todo Screen

export default function Todo() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#FFB3B3");
  const [categoryName, setCategoryName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const { userData } = useSelector((state) => state.user);
  const { isLoading, todoData } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const handleAddCategory = async () => {
    await add_todo_category(dispatch, {
      todo_board_id: userData?.todo_board[0],
      category_name: categoryName,
      color: selectedColor,
    });
    await get_todo_data(dispatch, userData);
    setCategoryName("");
    setShowAddCategoryModal(false);
  };

  const handleAddTodo = async () => {
    await add_todo_task(dispatch, {
      category_id: selectedCategory._id,
      task_title: taskName,
      task_description: taskDescription,
    });
    await get_todo_data(dispatch, userData);
    setTaskName("");
    setTaskDescription("");
    setShowAddTodoModal(false);
  };

  useEffect(() => {
    const getTodoData = async () => {
      await get_todo_data(dispatch, userData);
    };
    getTodoData();
  }, [userData]);

  useEffect(() => {
    setSelectedCategory(todoData?.categories.slice(0).reverse()[0]);
  }, []);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#e91e63" />
    </View>
  ) : (
    <SafeAreaView>
      <View style={styles.todo}>
        {showAddCategoryModal && (
          <AddTodoCategory
            setSelectedColor={setSelectedColor}
            selectedColor={selectedColor}
            setShowAddCategoryModal={setShowAddCategoryModal}
            handleSubmit={handleAddCategory}
            setCategoryName={setCategoryName}
            categoryName={categoryName}
          />
        )}
        {showAddTodoModal && (
          <AddTodo
            setShowAddTodoModal={setShowAddTodoModal}
            selectedCategory={selectedCategory?.category_name}
            handleSubmit={handleAddTodo}
            setTaskName={setTaskName}
            taskName={taskName}
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
          />
        )}
        <View style={styles.todoTopBar}>
          <Text style={styles.todoTitle}>TODO</Text>
        </View>
        <View style={styles.todoTopBar}>
          <Text style={styles.todoSubtitle}>Category</Text>
          <View>
            <TouchableOpacity
              onPress={() => setShowAddCategoryModal(!showAddCategoryModal)}
              activeOpacity={0.82}
            >
              <MaterialIcons name="add" size={30} style={styles.todoIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={{
            width: width,
            height: height * 0.2,
            marginTop: 10,
            marginBottom: 10,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {todoData?.categories
            ?.slice(0)
            .reverse()
            .map((category, index) => (
              <TouchableOpacity
                activeOpacity={0.82}
                onPress={() => setSelectedCategory(category)}
                key={index}
                style={{
                  width: width * 0.8,
                  height: height * 0.3,
                  marginLeft: index === 0 ? 5 : 0,
                  marginRight:
                    index === todoData?.categories.length - 1 ? 40 : 0,
                }}
              >
                <TodoCategoryCard
                  categoryTitle={category.category_name}
                  numberOfTasks={category.tasks.length}
                  numberOfCompletedTasks={
                    category.tasks.filter((task) => task.is_done).length
                  }
                  color={category.color}
                />
              </TouchableOpacity>
            ))}
        </ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.todoSubtitle}>
            {selectedCategory?.category_name} Tasks
          </Text>
          <TouchableOpacity
            onPress={() => setShowAddTodoModal(!showAddTodoModal)}
          >
            <MaterialIcons name="add" size={30} style={styles.todoIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          style={{
            width: width,
            height: height * 0.45,
            marginBottom: 10,
          }}
        >
          {todoData?.categories
            ?.filter(
              (todoItem) =>
                todoItem?.category_name === selectedCategory?.category_name
            )
            .map((todoItem, index) => {
              return (
                <View key={index}>
                  {todoItem?.tasks
                    ?.filter((task) => task.is_done === false)
                    .map((task, index) => {
                      return (
                        <TodoTaskAccordion
                          key={index}
                          title={task?.task_title}
                          description={task?.description}
                          task_id={task?._id}
                          is_done={task?.is_done}
                        />
                      );
                    })}
                </View>
              );
            })}
          {todoData?.categories
            ?.filter(
              (todoItem) =>
                todoItem?.category_name === selectedCategory?.category_name
            )
            .map((todoItem, index) => {
              return (
                <View key={index}>
                  {todoItem?.tasks
                    ?.filter((task) => task.is_done === true)
                    .map((task, index) => {
                      return (
                        <TodoTaskAccordion
                          key={index}
                          title={task?.task_title}
                          description={task?.description}
                          task_id={task?._id}
                          is_done={task?.is_done}
                        />
                      );
                    })}
                </View>
              );
            })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
