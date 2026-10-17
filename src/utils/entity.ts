type Entity = {
  userId: string;
};

export const isOwner = (userId: string, entity: Entity) => {
  return userId === entity.userId;
};
