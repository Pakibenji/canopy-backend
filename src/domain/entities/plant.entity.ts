export class Plant {
  constructor(
    public id: string,
    public plantName: string,
    public plantImage: string,
    public ownerId: string,
    public owner: string,
    public createdAt: Date
  ) {
    const validateName = (plantName: string) => {
      if (plantName.length > 30) {
        throw new Error("Name too long");
      }
      if (plantName.trim() === "") {
        throw new Error("Name cannot be empty");
      }
      if (!plantName) {
        throw new Error("Invalid name");
      }
    };
    const validateImage = (plantImage: string) => {
      if (plantImage.trim() === "") {
        throw new Error("Image cannot be empty");
      }
      if (!plantImage) {
        throw new Error("Invalid image");
      }
      if (!plantImage.startsWith("https")) {
        throw new Error("Invalid url");
      }
    };
    validateName(plantName);
    validateImage(plantImage);
  }
}
