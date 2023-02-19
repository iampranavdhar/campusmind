import React, { useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import globals from "../../../globalStyles/globals";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  remove_image_from_gallery,
  get_gallery_data,
  add_image_to_gallery,
} from "../../redux/actions/userActions";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { CLOUDIFY_URL } from "@env";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export function ImageCard({ image }) {
  const dispatch = useDispatch();
  const { isAdmin, org_id } = useSelector((state) => state?.user?.userData);

  const imageDelete = async () => {
    try {
      await remove_image_from_gallery(dispatch, {
        image: image,
        org_id: org_id,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View
      style={{
        ...styles.imageCard,
        height: height * 0.3,
        width: width * 0.925,
      }}
    >
      {isAdmin && (
        <TouchableOpacity
          style={styles.deleleteIcon}
          onPress={() => imageDelete()}
        >
          <MaterialIcons name="delete" size={24} color="white" />
        </TouchableOpacity>
      )}
      <Image
        source={{
          uri: image,
        }}
        style={{
          height: height * 0.3,
          width: width * 0.925,
        }}
      />
    </View>
  );
}

export default function Gallery() {
  const { isAdmin, org_id } = useSelector((state) => state.user.userData);
  const { galleryData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const getAllImages = async () => {
      await get_gallery_data(dispatch, {
        org_id: org_id,
      });
    };
    getAllImages();
  }, [org_id]);

  const pickImageFromGallery = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, We need gallery access to perform this!");
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [16, 12],
          quality: 0.8,
        });

        if (!result.cancelled) {
          const uri = result.uri;
          const name = result.uri.split("/").pop();
          const source = {
            uri,
            type: `image/${uri.split(".")[uri.split(".").length - 1]}`,
            name,
          };
          try {
            await cloudinaryUpload(source);
          } catch (error) {
            alert(error.message);
          }
        }
      }
    }
  };

  const cloudinaryUpload = async (photo) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "stuniverse");
      formData.append("cloud_name", "dbkrowqox");
      const res = await axios(CLOUDIFY_URL, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status !== 200) {
        alert("Error uploading image");
        return;
      }
      if (res.data?.secure_url) {
        await add_image_to_gallery(dispatch, {
          images: galleryData?.images
            ? [...galleryData?.images, res?.data?.secure_url]
            : [res.data.secure_url],
          org_id: org_id,
        });
        await get_gallery_data(dispatch, {
          org_id: org_id,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
    <View style={styles.galleryImages}>
      <ScrollView>
        {galleryData?.images?.map((image, index) => (
          <ImageCard key={index} image={image} />
        ))}
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
            onPress={() => pickImageFromGallery()}
          >
            <MaterialIcons name="add" size={45} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
