import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import globals from "../../../../globalStyles/globals";
import {
  add_branch,
  get_branches,
} from "../../../redux/actions/batchDetailActions";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import AddTextOnly from "../../../Modals/AddTextOnly";

export const BranchCard = ({ branchName, sections, branch_id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.batchCard}
      onPress={() =>
        navigation.navigate("AdminAllSectionsScreen", {
          sections: sections,
          branch_id: branch_id,
        })
      }
    >
      <Text style={styles.batchCardText}>{branchName}</Text>
    </TouchableOpacity>
  );
};

export default function AdminAllBatchesScreen() {
  const [showAddTextModal, setShowAddTextModal] = useState(false);
  const [text, setText] = useState("");
  const { isAdmin, org_id } = useSelector((state) => state.user.userData);
  const { isLoading, branchesData } = useSelector((state) => state.batch);
  const dispatch = useDispatch();

  useEffect(() => {
    get_branches(dispatch, org_id);
  }, [org_id]);

  const addBranch = async () => {
    if (text.length === 0) {
      alert("Please enter branch name");
      return;
    }
    try {
      await add_branch(dispatch, {
        org_id: org_id,
        branch_name: text,
      });
      await get_branches(dispatch, org_id);
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
      <ScrollView>
        {showAddTextModal && (
          <AddTextOnly
            setShowAddTextModal={setShowAddTextModal}
            handleSubmit={addBranch}
            setText={setText}
            text={text}
            modalName={`Branch`}
          />
        )}
        <View style={styles.batches}>
          {branchesData?.map((branch, index) => (
            <BranchCard
              key={index}
              branchName={branch.branch_name}
              sections={branch.sections}
              branch_id={branch._id}
            />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          width: "auto",
          position: "absolute",
          bottom: 0,
          right: 15,
          backgroundColor: "transparent",
        }}
      >
        {isAdmin && (
          <TouchableOpacity
            style={{
              bottom: 10,
              ...globals.floatingAddButton,
            }}
            onPress={() => setShowAddTextModal(true)}
          >
            <MaterialIcons name="add" size={45} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
