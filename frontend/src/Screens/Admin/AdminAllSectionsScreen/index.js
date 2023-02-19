import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import globals from "../../../../globalStyles/globals";
import AddTextOnly from "../../../Modals/AddTextOnly";
import {
  add_section,
  get_sections,
} from "../../../redux/actions/batchDetailActions";

export const SectionCard = ({ sectionName, section_id }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.sectionCard}
      onPress={() =>
        navigation.push("All Assignments", {
          section_id: section_id,
        })
      }
    >
      <Text style={styles.sectionCardText}>{sectionName}</Text>
    </TouchableOpacity>
  );
};

export default function AdminAllSectionsScreen({ navigation, route }) {
  const [showAddTextModal, setShowAddTextModal] = useState(false);
  const [text, setText] = useState("");
  const { isLoading, sectionsData } = useSelector((state) => state.batch);
  const { isAdmin } = useSelector((state) => state.user.userData);

  const { branch_id } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    const get_all_sections = async () => {
      await get_sections(dispatch, {
        branch_id: branch_id,
      });
    };
    get_all_sections();
  }, [branch_id]);

  const addSection = async () => {
    if (text.length === 0) {
      alert("Please enter section name");
      return;
    }
    try {
      await add_section(dispatch, {
        branch_id: branch_id,
        section_name: text,
      });
      await get_sections(dispatch, {
        branch_id: branch_id,
      });
      setText("");
      setShowAddTextModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
      }}
    >
      {showAddTextModal && (
        <AddTextOnly
          setShowAddTextModal={setShowAddTextModal}
          handleSubmit={addSection}
          setText={setText}
          text={text}
          modalName={`Section`}
        />
      )}
      <View style={styles.sections}>
        {sectionsData?.map((section, index) => (
          <SectionCard
            key={index}
            sectionName={section.section_name}
            section_id={section._id}
          />
        ))}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          right: 15,
          backgroundColor: "transparent",
        }}
      >
        {isAdmin && (
          <TouchableOpacity
            style={globals.floatingAddButton}
            onPress={() => setShowAddTextModal(true)}
          >
            <MaterialIcons name="add" size={45} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
