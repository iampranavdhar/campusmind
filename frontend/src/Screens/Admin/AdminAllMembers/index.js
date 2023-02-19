import React, { useEffect } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import {
  remove_member,
  get_org_members,
} from "../../../redux/actions/membersActions";
import globals from "../../../../globalStyles/globals";

const MemberCard = ({ member }) => {
  const dispatch = useDispatch();

  const memberRemove = async () => {
    try {
      await remove_member(dispatch, {
        org_id: member?.org_id,
        user_id: member?._id,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.memberCard}>
      <View style={styles.memberData}>
        <Image
          source={{
            uri:
              member.profile_image === "" || null
                ? "https://dvyvvujm9h0uq.cloudfront.net/com/articles/1525891879-379720-warren-wong-242286-unsplashjpg.jpg"
                : member.profile_image,
          }}
          style={{
            height: 120,
            width: 100,
          }}
        />
        <View>
          <View style={styles.memberDetails}>
            <Text style={{ fontFamily: globals.normalText.fontFamily }}>
              {member.user_full_name}
            </Text>
            <Text style={{ fontFamily: globals.normalText.fontFamily }}>
              {member.user_identity}
            </Text>
          </View>
          <View style={styles.memberButtons}>
            <TouchableOpacity
              style={{
                ...styles.memberButton,
                backgroundColor: "#FF605C",
              }}
              onPress={memberRemove}
            >
              <Text
                style={{
                  fontFamily: globals.normalText.fontFamily,
                  color: "#fff",
                }}
              >
                Remove
              </Text>
            </TouchableOpacity>
            <View
              style={{
                ...styles.memberButton,
                backgroundColor: "#00CA4E",
              }}
            >
              <Text
                style={{
                  fontFamily: globals.normalText.fontFamily,
                  color: "#fff",
                }}
              >
                Update
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function AdminAllMembers() {
  const user = useSelector((state) => state.user.userData);
  const members = useSelector((state) => state.member.orgMembersData);
  const [allMembers, setAllMembers] = React.useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    get_org_members(dispatch, user?.org_id);
  }, [user]);

  return (
    <View style={styles.members}>
      {members?.map((member) => {
        return <MemberCard member={member} key={member?._id} />;
      })}
    </View>
  );
}
