// Uses the same styles as Product
import styles from "./Product.module.css";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
export default function Product() {
  return (
    <main className={styles.product}>
      <Button type="primary">
        <NavLink to="/">Go Back</NavLink>
      </Button>
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
          <Button type="primary">Pay if you want to</Button>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
