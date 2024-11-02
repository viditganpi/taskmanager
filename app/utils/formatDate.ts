import moment from "moment";

function formatDate(date: string): string {
  return moment(date).format("DD/MM/YYYY");
}
export default formatDate;